import mongoose from 'mongoose';
const InteractionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['encrypt-text','decrypt-text','encrypt-file','decrypt-file'], required: true },
  input: String,
  output: String,
  timestamp: { type: Date, default: Date.now },
});
export default mongoose.model('Interaction', InteractionSchema);