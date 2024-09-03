import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import { json } from "express";
import getDataUri from "../utils/datauri.js";
import { Post } from "../models/post.model.js";

export const register = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
          return res.status(401).json({
              message: "Something is missing, please check!",
              success: false,
          });
      }
      const user = await User.findOne({ email });
      if (user) {
          return res.status(401).json({
              message: "Try different email",
              success: false,
          });
      };
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
          username,
          email,
          password: hashedPassword
      });
      return res.status(201).json({
          message: "Account created successfully.",
          success: true,
      });
  } catch (error) {
      console.log(error);
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing please check :  ",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email and password",
        success: false,
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return (
        res.status(401),
        json({
          message: "Incorrect email or password : ",
          success: false,
        })
      );
    }

    const token = await jwt.sign(
      { userId: user._id },
      process.env.SECERET_KEY,
      { expiresIn: "1d" }
    );

    /// populate // 
    const populatedPosts = await Promise.all(
      user.posts.map( async (postId) => {
          const post = await Post.findById(postId);
          if(post.author.equals(user._id)){
              return post;
          }
          return null;
      })
  )

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: populatedPosts,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const getProfile = async (req, res) => {
//   try {
//       const userId = req.params.id;
//       let user = await User.findById(userId).populate({path:'posts', createdAt:-1}).populate('bookmarks');
//       return res.status(200).json({
//           user,
//           success: true
//       });
//   } catch (error) {
//       console.log(error);
//   }
// };
export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;
    if (profilePicture) {
      const fileUri =  getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(401).json({
        message: "user not found",
        success: false,
      });
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;
    await user.save();
    return res.status(200).json({
      message: "Profile Updated",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUsers) {
      return res.status(400).json({
        message: "Currently do no have any users",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Successfully",
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const followOrOnfollow = async (req, res) => {
  try {
    const followKarneWala = req.id;
    const jiskoFollowKarunga = req.params.id;
    if (followKarneWala === jiskoFollowKarunga) {
      return res.status(400).json({
        message: "You can not follow/unfollow yourself",
        success: false,
      });
    }

    const user = await User.findById(followKarneWala);
    const targetUser = await User.findById(jiskoFollowKarunga);

    if (!user || !targetUser) {
      return res.status(400).json({
        message: "User Not found ",
        success: false,
      });
    }

    // follow and unfollow logic
    const isFollowing = user.following.includes(jiskoFollowKarunga);
    if (isFollowing) {
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $pull: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $pull: { followers: followKarneWala } }
        ),
      ]);
      return res.status(200).json({
        message: "Unfollow successfully",
        success: true,
      });
    } else {
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $push: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $push: { followers: followKarneWala } }
        ),
      ]);
      return res.status(200).json({
        message: "follow successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
