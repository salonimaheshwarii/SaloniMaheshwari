'use client';

import { motion } from 'framer-motion';

const sectionData = {
  home: {
    title: "Portfolio",
    subtitle: "SALONI MAHESHWARI - Software Engineer",
    content: "Welcome to my professional portfolio. I am a dedicated software engineer specializing in cloud technologies, full-stack development, and scalable system architecture with expertise in modern web technologies.",
    cta: "View Portfolio"
  },
  about: {
    title: "About",
    subtitle: "Professional Profile",
    content: "I am Saloni Maheshwari, a Software Engineer with comprehensive experience in cloud migration, modern web development, and scalable architecture. Currently contributing to cloud operations platforms at EY GDS, I focus on creating efficient, user-centric interfaces and optimizing infrastructure performance.",
    skills: ["React.js", "Next.js", "AWS", "Docker", "Terraform", "TypeScript", "Vue.js", "Node.js"]
  },
  education: {
    title: "Education",
    subtitle: "Academic Background",
    content: "My educational foundation in Computer Science has provided me with comprehensive knowledge in software engineering principles, algorithms, and modern development practices.",
    items: [
      { title: "Bachelor of Technology in Computer Science", institution: "Geetanjali Institute of Technical Studies", year: "2020-2024", description: "GPA: 9.4 - Udaipur, Rajasthan" }
    ]
  },
  experience: {
    title: "Experience",
    subtitle: "Professional Background",
    content: "My professional journey encompasses diverse roles in cloud engineering, full-stack development, and modern web technologies across multiple organizations.",
    items: [
      {
        title: "Software Engineer",
        company: "EY GDS",
        period: "Dec 2024 - Present",
        description: "Contributing to cloud migration to AWS using Docker, CI/CD pipelines, and Terraform. Building cloud operations platform frontend with modern architecture and scalable design standards."
      },
      {
        title: "Junior Cloud Engineer",
        company: "Kansocloud",
        period: "July 2023 - Dec 2024",
        description: "Developed dynamic web applications using React.js, Redux Toolkit, and Next.js. Led full UI redesign of Vue.js project and built reliable backend solutions using AWS services."
      },
      {
        title: "Web Developer",
        company: "Lakebrains Technologies",
        period: "April 2023 - July 2023",
        description: "Specialized in React.js and Chrome extensions development. Explored MERN stack for full-stack web development, creating robust applications."
      }
    ]
  },
  projects: {
    title: "Projects",
    subtitle: "Technical Projects",
    content: "A comprehensive overview of key projects demonstrating expertise in modern web technologies and software development practices.",
    projects: [
      {
        name: "Clipify",
        tech: "HTML, Go, React.js",
        description: "Open-source, cross-device data sharing tool focused on privacy and simplicity. Contributed as frontend designer and developer.",
        link: "https://github.com/lovepurohit/clipify"
      },
      {
        name: "Interactive Portfolio",
        tech: "React, Three.js, Next.js",
        description: "Professional portfolio website featuring 3D visualizations and interactive elements built with modern web technologies."
      },
      {
        name: "Cloud Operations Platform",
        tech: "React.js, AWS, Terraform",
        description: "Frontend development for multi-cloud management platform with focus on scalability and user experience."
      }
    ]
  },
  skills: {
    title: "Technical Skills",
    subtitle: "Core Competencies",
    content: "Comprehensive technical expertise spanning frontend development, backend systems, cloud infrastructure, and modern development tools.",
    categories: [
      {
        name: "Frontend",
        skills: ["React.js", "Next.js", "Vue.js", "AngularJS", "Redux Toolkit", "TypeScript", "JavaScript"]
      },
      {
        name: "Backend & Cloud",
        skills: ["Node.js", "Express.js", "AWS (ECS, ECR, EC2, Lambda, S3)", "Docker", "Terraform", "CI/CD"]
      },
      {
        name: "Languages & Tools",
        skills: ["JavaScript", "TypeScript", "C/C++", "SQL", "Git & GitHub", "Linux", "Chrome Extensions"]
      },
      {
        name: "UI & Styling",
        skills: ["Tailwind CSS", "Bootstrap", "Material UI", "Ant Design", "HTML", "CSS"]
      }
    ]
  },
  achievements: {
    title: "Achievements",
    subtitle: "Professional Recognition",
    content: "Key accomplishments and recognition received for technical excellence and innovative problem-solving in software development.",
    achievements: [
      {
        title: "Smart India Hackathon Winner - 2022",
        description: "Department of Science & Technology (Software Edition) - Recognized for innovative software solution",
        year: "2022"
      },
      {
        title: "HackerRank 3-Star Coder",
        description: "Achieved 3-star rating in C++ programming demonstrating strong algorithmic problem-solving skills",
        year: "2023"
      },
      {
        title: "Open Source Contributor",
        description: "Active contributor to open-source projects including cross-device data sharing tools",
        year: "2024"
      }
    ]
  },
  certificates: {
    title: "Certifications",
    subtitle: "Professional Credentials",
    content: "Industry-recognized certifications demonstrating expertise in various technologies and commitment to continuous learning.",
    certificates: [
      { name: "Python for Everybody", issuer: "Coursera", year: "2023" },
      { name: "React Basics", issuer: "Meta", year: "2023" },
      { name: "MySQL Basics", issuer: "Online Platform", year: "2023" },
      { name: "GitHub Copilot", issuer: "GitHub", year: "2024", link: "https://www.credly.com/badges/18c5e0ff-1b4a-451a-9cfd-c7062fd6752c/public_url" }
    ]
  },
  contact: {
    title: "Contact",
    subtitle: "Professional Contact Information",
    content: "I am open to discussing new opportunities, collaborations, and professional engagements. Please feel free to reach out through any of the following channels.",
    contacts: [
      { type: "Email", value: "salonimaheshwari2113@gmail.com", icon: "📧", link: "mailto:salonimaheshwari2113@gmail.com" },
      { type: "Phone", value: "7568305343", icon: "📱", link: "tel:7568305343" },
      { type: "LinkedIn", value: "saloni-maheshwari", icon: "💼", link: "https://linkedin.com/in/saloni-maheshwari" },
      { type: "GitHub", value: "salonimaheshwarii", icon: "🚀", link: "https://github.com/salonimaheshwarii" }
    ]
  }
};

export default function SectionContent({ section, onProjectClick }) {
  // Safety check for section prop
  if (!section || !section.id) {
    return null;
  }

  const data = sectionData[section.id] || sectionData.home;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      key={section.id}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed inset-0 z-20 flex items-center justify-center p-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 mb-4">
            {data.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-300 font-medium">
            {data.subtitle}
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {data.content}
          </p>
        </motion.div>

        {/* Section-specific content */}
        <motion.div variants={itemVariants}>
          {/* Home CTA */}
          {section.id === 'home' && (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 border border-blue-500/20"
            >
              {data.cta}
            </motion.button>
          )}

          {/* Skills Grid */}
          {section.id === 'about' && data.skills && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-400 font-medium"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          )}

          {/* Education/Experience Items */}
          {(section.id === 'education' || section.id === 'experience') && data.items && (
            <div className="space-y-6 max-w-2xl mx-auto">
              {data.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="professional-card p-6 text-left"
                >
                  <h3 className="text-xl font-bold text-blue-400 mb-2">{item.title}</h3>
                  <p className="text-slate-300 mb-1 font-medium">
                    {item.institution || item.company} • {item.year || item.period}
                  </p>
                  {item.description && (
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          {section.id === 'projects' && data.projects && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(34, 211, 238, 0.3)"
                  }}
                  onClick={() => project.link ? window.open(project.link, '_blank') : onProjectClick(project)}
                  className="professional-card p-6 cursor-pointer hover:border-blue-500/60 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-blue-400">{project.name}</h3>
                    {project.link && (
                      <span className="text-blue-400 text-sm">🔗</span>
                    )}
                  </div>
                  <p className="text-sm text-cyan-400 mb-3 font-medium">{project.tech}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Skills Categories */}
          {section.id === 'skills' && data.categories && (
            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
              {data.categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="professional-card p-4 flex-1 min-w-[250px] max-w-[300px]"
                >
                  <h3 className="text-lg font-bold text-blue-400 mb-3 text-center">{category.name}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.2) + (skillIndex * 0.05) }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 2,
                          boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)"
                        }}
                        className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded-md text-blue-400 font-medium text-xs cursor-pointer transition-all duration-200 hover:bg-blue-500/30 hover:border-blue-500"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Certificates Grid */}
          {section.id === 'certificates' && data.certificates && (
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {data.certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className={`bg-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6 transition-all duration-300 ${
                    cert.link ? 'cursor-pointer hover:border-cyan-400/60' : ''
                  }`}
                  onClick={() => cert.link && window.open(cert.link, '_blank')}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-cyan-400">{cert.name}</h3>
                    {cert.link && (
                      <span className="text-cyan-400 text-sm">🏆</span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-2">{cert.issuer}</p>
                  <p className="text-cyan-300 text-sm">{cert.year}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Achievements Grid */}
          {section.id === 'achievements' && data.achievements && (
            <div className="space-y-6 max-w-3xl mx-auto">
              {data.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6 text-left"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-cyan-400">{achievement.title}</h3>
                    <span className="text-cyan-300 text-sm font-mono">{achievement.year}</span>
                  </div>
                  <p className="text-gray-300">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Contact Info */}
          {section.id === 'contact' && data.contacts && (
            <div className="space-y-4 max-w-md mx-auto">
              {data.contacts.map((contact, index) => (
                <motion.a
                  key={contact.type}
                  href={contact.link}
                  target={contact.link?.startsWith('http') ? '_blank' : '_self'}
                  rel={contact.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center space-x-4 bg-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-4 cursor-pointer hover:border-cyan-400/60 transition-all duration-300"
                >
                  <span className="text-2xl">{contact.icon}</span>
                  <div className="text-left">
                    <p className="text-cyan-400 font-medium">{contact.type}</p>
                    <p className="text-gray-300 text-sm">{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}