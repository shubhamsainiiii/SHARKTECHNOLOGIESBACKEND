import Project from '../models/project.model.js';
import Service from '../models/service.model.js';
import Blog from '../models/blog.model.js';
import { Stat, TeamMember } from '../models/misc.models.js';
import Testimonial from '../models/testimonial.model.js';
import { sendSuccess } from '../utils/response.js';


export const getDashboardStats = async (req, res, next) => {
    try {
        const [projects, services, testimonials, blogs, stats, team] = await Promise.all([
            Project.countDocuments(),
            Service.countDocuments({ status: 'Active' }),
            Testimonial.countDocuments({ status: 'Published' }),
            Blog.countDocuments({ status: 'Published' }),
            Stat.countDocuments(),
            TeamMember.countDocuments({ status: 'Active' }),
        ]);

        const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5).select('title category status createdAt');
        const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5).select('title category status createdAt');

        sendSuccess(res, {
            counts: { projects, services, testimonials, blogs, team },
            recentProjects,
            recentBlogs,
        });
    } catch (err) { next(err); }
};