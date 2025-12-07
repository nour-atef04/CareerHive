import PanelTitle from "../../ui/PanelTitle";
import styles from "./JobAboutSection.module.css";

export default function JobAboutSection() {
  return (
    <section>
      <PanelTitle className={styles["about-title"]} type="h3">
        About the job
      </PanelTitle>
      <div className={styles["about"]}>
        Software Developer | Full-Time | Remote | Egypt We are a trusted
        recruitment partner dedicated to connecting exceptional talent with
        world-class organizations. On behalf of a growing software company
        serving clients across global markets, we are seeking a skilled and
        motivated Software Developer to join their dynamic engineering team.
        This is a full-time remote opportunity, open to candidates based in
        Egypt. About the Role As a Software Developer, you will be responsible
        for designing, developing, and maintaining high-quality software
        applications. You will collaborate closely with cross-functional teams
        to deliver scalable solutions while ensuring performance, usability, and
        reliability. This role is ideal for a problem-solver who enjoys writing
        clean code and working in a collaborative, innovation-driven
        environment. Key Responsibilities Develop, test, and maintain software
        applications according to business and technical requirements.
        Collaborate with product managers, designers, and fellow developers to
        create robust and user-friendly solutions. Write clean, efficient, and
        maintainable code following industry best practices. Participate in code
        reviews, technical discussions, and continuous improvement initiatives.
        Troubleshoot, debug, and resolve software defects and performance
        issues. Contribute to architectural decisions and provide input on
        technical roadmaps. Stay up to date with emerging technologies,
        frameworks, and development methodologies. Qualifications Bachelor’s
        degree in Computer Science, Software Engineering, or a related field.
        2–4 years of experience in software development. Strong proficiency in
        one or more programming languages (e.g., JavaScript, Python, Java, C#,
        or similar). Experience with modern development frameworks and tools
        (e.g., React, Node.js, .NET, Django, etc.). Knowledge of databases (SQL
        / NoSQL) and API development. Familiarity with version control systems
        (e.g., Git). Strong problem-solving skills and ability to work
        independently in a remote environment. Fluency in English is required.
        What’s Offered Full-time remote role open to professionals across Egypt.
        Opportunity to work in a collaborative and fast-growing software
        environment. Competitive compensation package. Flexible, supportive, and
        innovation-focused culture. Opportunities for professional growth and
        continuous learning. Apply Now If you are a passionate software
        developer looking to join a forward-thinking company and contribute to
        exciting digital solutions, we invite you to apply and become part of a
        team where your skills truly make an impact.
      </div>
    </section>
  );
}
