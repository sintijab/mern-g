import { ObjectId } from 'mongodb';
import { User } from './models/user';
import { Book } from './models/book';

const prepare = (obj) => {
  obj._id = obj._id.toString()
  return obj
}

export const resolvers = {
  Query: {
    users: () => User.find(),
    books: () => Book.find(),
  },
  Mutation: {
    createUser: async(_, { name }) => {
      const user = new User({ name });
      await user.save();
      return user;
    },
    addBook: async(_, { ownerId, author, title, availability, description }) => {
      try {
        const user =  await User.findOne({ _id: ownerId });
      } catch (e) {
        throw new Error(`Couldn't find user with id ${ownerId}`);
      }
      // Add new Book
      const book = new Book({ owner: user, author, title, availability, description });
      await book.save();

      // Update User Profile
      try {
        let allBooks = await Book.find({ owner: user });
        const updatedUser = await User.updateOne({ _id: ownerId }, { $set: { books: allBooks }});

      } catch (e) {
        throw new Error(`Couldn't update user profile of id: ${ownerId}`);
      }
      return book;
    }
  }
}
