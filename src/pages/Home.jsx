import React from "react";
import { teams } from "../data/data";
import TeamCard from "../components/TeamCard";
import { useDispatch } from "react-redux";
import { setTeam } from "../store/teamSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../animations/pageTransition";
import { reloadTodos } from "../store/todoSlice";

function Home() {
  const dispatch = useDispatch();

  return (
    <motion.div
      className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 py-16 px-6 overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Manage Your Teams Tasks Easily
        </h1>
        <p className="text-gray-600 text-xl">
          Stay productive and keep every team organized.
        </p>
      </div>

      {
        /* Teams Section */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teams.map((team, index) => {
            return (
              <Link
                key={index}
                to="/todo"
                onClick={() => {
                  dispatch(
                    setTeam({ teamColor: team.colorIcon, teamName: team.name })
                  );
                  dispatch(reloadTodos());
                }}
              >
                <TeamCard {...team} />
              </Link>
            );
          })}
        </div>
      }
      <footer className="mt-15 text-center text-gray-500 text-sm">
        Designed & Developed by{" "}
        <span className="text-gray-900 font-semibold hover:text-blue-600 transition-colors">
          Zeiad Haggag
        </span>
        <p className="text-xs mt-1">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
}

export default Home;
