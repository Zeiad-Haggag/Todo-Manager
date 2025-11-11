import React from "react";

function TeamCard({ name, colorBg, colorIcon, Icon, desc }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg overflow-hidden transitoin duration-200">
      <div
        className=" flex justify-center py-6"
        style={{ backgroundColor: colorBg }}
      >
        <div
          className=" flex items-center justify-center text-white w-14 h-14 rounded-xl"
          style={{ backgroundColor: colorIcon }}
        >
          <Icon size={28} />
        </div>
      </div>
      <div className="p-6 text-center ">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}

export default TeamCard;
