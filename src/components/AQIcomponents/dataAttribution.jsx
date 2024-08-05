import moment from "moment";
import React from "react";

function Dataattribution({ attribution, time }) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between p-5 w-full text-neutral">
        <div>
          <p>Sources</p>
          {attribution.map((attr, index) => (
            <li key={index}>
              <a
                href={attr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline hover:text-gray-300 duration-300"
              >
                {attr.name}
              </a>
            </li>
          ))}
        </div>
        <p className="text-xs ms-auto my-2 text-green-500 md:my-auto">Last Updated: {moment(time.s).fromNow()}</p>
      </div>
    </>
  );
}

export default Dataattribution;
