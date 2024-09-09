import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaUser, FaCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function Contact() {
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate();
    const form = useRef();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const {user} = useAuthContext()

    useEffect(()=>{
        if(user)
        {
            setFormData({
                from_name:user.name,
                from_email:user.email,
            })
        }
    },[user])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.from_name && formData.from_email && formData.message) {
            emailjs.sendForm('service_9mp4t3q', 'template_1zpox1m', form.current, 'oqTfP-HP0MvvlK8fs')
                .then(
                    () => {
                        toast.success('Message sent successfully!');
                        setSubmitted(true)
                        setTimeout(() => navigate('/'), 1000);
                    },
                    (error) => {
                        toast.error('Failed to send message. Please try again later.');
                        console.log('FAILED...', error.text);
                    }
                );
        } else {
            toast.error("Please fill all the fields")
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700  p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Contact Us
                </h2>
                {submitted ? (
                    <div className="text-center">
                        <h3 className="text-2xl text-green-600">Thank you for your message!</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            We will get back to you as soon as possible.
                        </p>
                    </div>
                ) : (
                    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div className="relative">
                            <FaUser className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
                            <input
                                type="text"
                                id="from_name"
                                name="from_name"
                                value={formData.from_name}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <FaEnvelope className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
                            <input
                                type="email"
                                id="from_email"
                                name="from_email"
                                value={formData.from_email}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Email"
                            />
                        </div>

                        {/* Message Field */}
                        <div className="relative">
                            <FaCommentDots className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Message"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Send Message
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Contact;
