import React from "react";

function Dataattribution({ aqiData }) {
  return (
    <>
      <div className="mt-6 bg-gray-700 p-6 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-4">Data Attribution</h3>
        <ul className="list-disc list-inside">
          {aqiData.attributions.map((attr, index) => (
            <li key={index}>
              <a
                href={attr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-300 hover:underline"
              >
                {attr.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-right text-gray-500 mt-4">
        Last Updated: {aqiData.time.s}
      </p>
    </>
  );
}

export default Dataattribution;
