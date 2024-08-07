import React from "react";
import "./About.css";
import { motion } from "framer-motion";

export default function AboutUs() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

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
      role: "Full Stack Web Developer",
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
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 1 }}
          className="title"
        >
          About Us
        </motion.h1>

        <motion.div
          className="subtitle"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Urban Air Quality Management Platform
        </motion.div>

        <section className="vision mb-5">
          <h2 className="border border-green-400 rounded">Our Vision</h2>
          <p className="text-gray-300 p-3">
            At GreenSky, we envision a world where urban dwellers breathe clean
            air, live healthier lives, and actively participate in creating
            sustainable cities.
          </p>
        </section>

        <section className="mission mb-5">
          <h2 className="border border-green-400 rounded">Our Mission</h2>
          <ul className="text-gray-300 p-3">
            <li>Empower citizens with real-time air quality data</li>
            <li>Support authorities in making data-driven decisions</li>
            <li>Promote sustainable practices</li>
            <li>Create a community of environmentally-conscious individuals</li>
          </ul>
        </section>

        <section className="approach mb-5">
          <h2 className="border border-green-400 rounded">Our Approach</h2>
          <div className="feature-grid  text-gray-300">
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="challenge mb-5">
          <h2 className="border border-green-400 rounded">The Challenge We're Tackling</h2>
          <p className="text-gray-300 p-3">
            Urban areas worldwide are grappling with dangerous levels of air
            pollution. We're bridging the gap by developing a comprehensive
            solution that connects citizens, authorities, and environmental
            data.
          </p>
        </section>

        <section className="team mb-8">
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
                referrerPolicy="no-referrer"
                key={index}
                className="team-member"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={`https://avatars.githubusercontent.com/${member.gh_uid}`}
                  alt={member.name}
                />
                <h3>{member.name}</h3>
                <p className="text-gray-300 p-3">{member.role}</p>
              </motion.a>
            ))}
          </div>
        </section>

        <section className="impact mb-5">
          <h2 className="border border-green-400 rounded">Our Impact</h2>
          <p className="text-gray-300 p-3">
            Through GreenSky, we aspire to increase awareness, enhance
            decision-making, contribute to healthier urban living, and foster
            community collaboration for a greener future.
          </p>
        </section>
      </div>
    </div>
  );
}
