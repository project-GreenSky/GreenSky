import React, { useState } from 'react';
import './AirQualityBlog.css';
import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_BLOG_IMG_BASE_URL;

// Blog list
const blogs = [
  {
    id: 1,
    title: 'Understanding Air Quality',
    image: `${BASE_URL}/greensky/zwvguvn2e4eqfmqmiwy4.jpg`,
    content: `Air quality refers to the condition of the air within our surroundings.
              It is important because it affects our health, the environment, and the
              climate. Good air quality means clean, clear, unpolluted air. Bad air quality
              can have harmful effects on human health, causing respiratory problems and
              other serious conditions.`,
  },
  {
    id: 2,
    title: 'Health Impacts of Air Pollution',
    image: `${BASE_URL}/greensky/il0cyc5njo67ce9s2rah.jpg`,
    content: `Exposure to polluted air can have significant health impacts, including
              respiratory and cardiovascular diseases. Long-term exposure can lead to chronic
              conditions and even premature death. Children, the elderly, and people with
              pre-existing health conditions are particularly vulnerable to the effects of air
              pollution. It is crucial to monitor air quality and take steps to reduce pollution
              to protect public health.`,
  },
  {
    id: 3,
    title: 'Causes of Air Pollution',
    image: `${BASE_URL}/greensky/nt13xgek8sedafwoooiu.jpg`,
    content: `Air pollution can be caused by various factors, including industrial emissions,
              vehicle exhaust, burning of fossil fuels, and agricultural activities. These
              sources release pollutants such as particulate matter, nitrogen oxides, sulfur
              dioxide, and volatile organic compounds into the air. Understanding the causes
              of air pollution is essential for implementing effective measures to reduce
              pollution levels.`,
  },
  {
    id: 4,
    title: 'Effects of Indoor Air Pollution',
    image: `${BASE_URL}/greensky/hxwclb2ngcy8esdxgu4v.jpg`,
    content: `Indoor air pollution refers to the contamination of indoor air by pollutants
              such as smoke, dust, mold, and chemicals. It can have adverse effects on
              human health, particularly respiratory health. Poor ventilation, smoking,
              and the use of certain household products contribute to indoor air pollution.
              Taking steps to improve indoor air quality, such as proper ventilation and
              reducing exposure to pollutants, is important for maintaining a healthy
              living environment.`,
  },
  {
    id: 5,
    title: 'Air Quality Index (AQI)',
    image: `${BASE_URL}/greensky/vlbta00vpeh5qhdew52i.jpg`,
    content: `The Air Quality Index (AQI) is a measure used to assess and report air quality
              levels. It provides information about the concentration of pollutants in the air
              and their potential health effects. The AQI is typically categorized into
              different levels, such as good, moderate, unhealthy, and hazardous, to help
              people understand the current air quality conditions and take appropriate
              actions to protect their health.`,
  },
  {
    id: 6,
    title: 'Air Quality Monitoring',
    image: `${BASE_URL}/greensky/qsimj90c9dgr65b2ul4w.jpg`,
    content: `Air quality monitoring involves the measurement and analysis of air pollutants
              to assess the quality of the air. Monitoring stations are set up in various
              locations to collect data on pollutant levels. This data is used to identify
              pollution sources, track trends, and develop strategies for improving air
              quality. Advanced monitoring technologies, such as remote sensing and
              sensor networks, are increasingly being used to enhance air quality monitoring
              capabilities.`,
  },
  {
    id: 7,
    title: 'Air Quality Regulations',
    image: `${BASE_URL}/greensky/t3iht44curndulm38e7e.jpg`,
    content: `Air quality regulations are laws and policies implemented by governments to
              control and reduce air pollution. These regulations set limits on pollutant
              emissions from various sources, establish air quality standards, and outline
              compliance requirements. They aim to protect public health, preserve the
              environment, and promote sustainable development. Compliance with air quality
              regulations is essential for maintaining clean and healthy air.`,
  },
  {
    id: 8,
    title: 'Air Quality Improvement Strategies',
    image: `${BASE_URL}/greensky/fyibgucuwhjjlz6wiyos.jpg`,
    content: `To improve air quality, various strategies can be implemented at different levels.
              These include reducing emissions from industrial processes and vehicles,
              promoting clean energy sources, implementing stricter emission standards,
              enhancing public transportation, and raising awareness about air pollution
              and its impacts. Collaboration between governments, industries, and
              communities is crucial for effective air quality improvement.`,
  },
  {
    id: 9,
    title: 'Air Quality and Climate Change',
    image: `${BASE_URL}/greensky/cmfj7vcjjakglktjygn2.jpg`,
    content: `Air quality and climate change are closely interconnected. Many air pollutants,
              such as carbon dioxide, methane, and black carbon, contribute to both air
              pollution and climate change. Addressing air pollution can have co-benefits
              for mitigating climate change, and vice versa. Implementing measures to
              reduce greenhouse gas emissions and promote sustainable practices can
              help improve both air quality and the global climate.`,
  },
  {
    id: 10,
    title: 'Individual Actions for Better Air Quality',
    image: `${BASE_URL}/greensky/bo6seap2okeb5ipvedbf.jpg`,
    content: `Individuals can also contribute to better air quality by adopting certain actions.
              These include using public transportation or carpooling, reducing energy
              consumption, avoiding burning of waste, planting trees, and practicing
              responsible waste management. Small changes in daily habits can make a
              significant difference in reducing air pollution and improving the overall
              air quality in our communities.`,
  },
  {
    id: 11,
    title: 'Air Quality and Respiratory Health',
    image: `${BASE_URL}/greensky/kjx01xwzyawy3zxskm25.jpg`,
    content: `Air quality plays a crucial role in respiratory health. Poor air quality can
              exacerbate respiratory conditions such as asthma, bronchitis, and allergies.
              It can also increase the risk of respiratory infections. Children, the elderly,
              and individuals with pre-existing respiratory conditions are particularly
              vulnerable. Maintaining good air quality through pollution control measures
              and proper ventilation is essential for protecting respiratory health.`,
  },
  {
    id: 12,
    title: 'Air Quality and Environmental Impact',
    image: `${BASE_URL}/greensky/ywa9sx6v6tjnswtplcx1.jpg`,
    content: `Air pollution has significant environmental impacts. It can harm ecosystems,
              damage vegetation, and contribute to climate change. Pollutants released into
              the air can deposit on land and water, leading to soil and water pollution.
              Acid rain, smog, and ozone depletion are some of the environmental effects
              of air pollution. Protecting air quality is crucial for preserving biodiversity
              and maintaining a sustainable environment.`,
  },
];

const AirQualityBlog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="blog-page">
      <header>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Air Quality Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Exploring the importance of clean air for a healthier future
        </motion.p>
      </header>

      <main>
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card border border-green-400 border-collapse rounded-md"
              onClick={() => handleBlogClick(blog)}
            >
              <img src={blog.image} alt={blog.title} />
              <h2>{blog.title}</h2>
            </div>
          ))}
        </div>
      </main>
      {selectedBlog && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <h2>{selectedBlog.title}</h2>
            <img src={selectedBlog.image} alt={selectedBlog.title} />
            <p>{selectedBlog.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirQualityBlog;
