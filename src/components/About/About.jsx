import React from "react";
import "./About.css";
import { motion, useInView } from "framer-motion";

const AnimatedSection = ({ children, className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Vinayak Vohra",
      role: "Full Stack Web Developer",
      gh_uid: "vinayak-vohra",
    },
    {
      name: "Sumit Dwivedi",
      role: "Full Stack Web Developer",
      gh_uid: "SumitDwivedi24X",
    },
    {
      name: "Rishi Mehto",
      role: "Front End Developer",
      gh_uid: "rishi998",
    },
    {
      name: "Sahil Pahuja",
      role: "Full Stack Web Developer",
      gh_uid: "pahuja-sahil",
    },
    {
      name: "Hardik Bhanot",
      role: "Full Stack Web Developer",
      gh_uid: "Hardikbhanot",
    },
    {
      name: "Divyanshu Rastogi",
      role: "Full Stack Web Developer",
      gh_uid: "divyansshurastogi351",
    },
  ];

  return (
    <div className="about-us">
      <div className="content-wrapper bg-base-200 rounded-lg">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="title mb-0"
        >
          About Us
        </motion.h1>

        <motion.div
          className="subtitle"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Urban Air Quality Management Platform
        </motion.div>

        <AnimatedSection className="vision mb-5">
          <h2 className="border border-green-400 rounded">Our Vision</h2>
          <p className="text-gray-300 p-3">
            At GreenSky, we envision a world where urban dwellers breathe clean
            air, live healthier lives, and actively participate in creating
            sustainable cities.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mission mb-5">
          <h2 className="border border-green-400 rounded">Our Mission</h2>
          <ul className="text-gray-300 p-3">
            <li>Empower citizens with real-time air quality data</li>
            <li>Support authorities in making data-driven decisions</li>
            <li>Promote sustainable practices</li>
            <li>Create a community of environmentally-conscious individuals</li>
          </ul>
        </AnimatedSection>

        <AnimatedSection className="approach mb-5">
          <h2 className="border border-green-400 rounded">Our Approach</h2>
          <div className="feature-grid text-gray-300">
            {[
              "Real-time data visualization",
              "CO2 emission calculators",
              "Health impact metrics",
              "Educational resources",
              "Community engagement tools",
              "Air quality alerts",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.05 } }}
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <section className="challenge mb-5">
            <h2 className="border border-green-400 rounded">
              The Challenge We're Tackling
            </h2>
            <p className="text-gray-300 p-3">
              Urban areas worldwide are grappling with dangerous levels of air
              pollution. We're bridging the gap by developing a comprehensive
              solution that connects citizens, authorities, and environmental
              data.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection className="team mb-8">
          <h2 className="border border-green-400 rounded">Our Team</h2>
          <p className="text-gray-300 p-3">
            We are six passionate students from{" "}
            <strong>
              University School of Information, Communication And Technology
              (GGSIPU)
            </strong>
            , known as "<strong>wedbevs</strong>" united by our commitment to
            environmental sustainability and technological innovation.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.a
                href={`https://github.com/${member.gh_uid}`}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="team-member"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <img
                  src={`https://avatars.githubusercontent.com/${member.gh_uid}`}
                  alt={member.name}
                />
                <h3>{member.name}</h3>
                <p className="text-gray-300 p-2">{member.role}</p>
              </motion.a>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="impact mb-5">
          <h2 className="border border-green-400 rounded">Our Impact</h2>
          <p className="text-gray-300 p-3">
            Through GreenSky, we aspire to increase awareness, enhance
            decision-making, contribute to healthier urban living, and foster
            community collaboration for a greener future.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
