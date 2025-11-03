const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot be longer than 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: [1000, 'Message cannot be longer than 1000 characters']
    },
    read: {
        type: Boolean,
        default: false
    },
    ipAddress: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// Prevent duplicate submissions within 5 minutes
contactSchema.index({ email: 1, message: 1, createdAt: 1 }, { 
    unique: true, 
    partialFilterExpression: { 
        createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) } 
    } 
});

module.exports = mongoose.model('Contact', contactSchema);