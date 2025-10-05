import React from 'react';

// Reusable component for the skill/percentage cards
interface Skill{
    skill: string
    percentage: number
    colorClass: string
}
const SkillCard = ({ skill, percentage, colorClass }: Skill) => {
  return (
    <div className={`p-4 h-32 flex flex-col bg-[#1f1d38] rounded-xl shadow-2xl justify-end  ${colorClass} transition duration-100 hover:shadow-lg hover:shadow-current/50`}>
      <p className="text-4xl font-extrabold text-white">{percentage}%</p>
      <p className="text-sm font-semibold mt-1" style={{ color: colorClass.split('-')[2] }}>
        {skill}
      </p>
    </div>
  );
};

const MyAdvantage = () => {
  const skillsData = [
    { skill: 'Figma', percentage: 78, colorClass: 'border-yellow-500' },    
    { skill: 'ReactJS', percentage: 85, colorClass: 'border-purple-600' },
    { skill: 'NextJs', percentage: 68, colorClass: 'border-blue-500' },
    { skill: 'WordPress', percentage: 32, colorClass: 'border-orange-500' },
  ];

  return (
    <div className="bg-gray-900 mx-auto p-10 md:p-16 text-white font-sans ">
      <div className="gap-12">
        <div className="space-y-8 md:flex gap-5">
          <div className="mb-8 flex flex-col justify-center flex-1">
            <h2 className="text-5xl font-bold mb-4">My Advantage</h2>
            <p className="text-[#c2b0b0] max-w-md">
              Must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account the system and expound the actual and praising pain was born.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 flex-1">
            {skillsData.map((skill) => (
              <SkillCard
                key={skill.skill}
                skill={skill.skill}
                percentage={skill.percentage}
                colorClass={`${skill.colorClass} flex justify-center items-center py-8`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAdvantage;