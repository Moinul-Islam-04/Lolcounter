import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./Searchbar.css";

interface Champion {
  id: string;
  name: string;
  image: {
    full: string;
  };
}

export const Searchbar = () => {
  const [input, search] = useState("");
  const [champions, setChampions] = useState<Champion[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);

  useEffect(() => {
    // Make API call to get the list of champions from Data Dragon API
    axios.get("https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json")
      .then(response => {
        const championsData = response.data.data;
        setChampions(Object.values(championsData));
        setFilteredChampions(Object.values(championsData));
      })
      .catch(error => {
        console.error("Error fetching champions:", error);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    search(e.target.value);

    // Filter champions based on input
    const filtered = champions.filter(champion =>
      champion.name.toLowerCase().includes(searchTerm)
    );

    setFilteredChampions(filtered);
  };

  const handleChampionClick = (champion: Champion) => {
    // Handle the click event for a selected champion
    setSelectedChampion(champion);
    // You can perform any additional logic here, e.g., send the selected champion to your ML model
    console.log("Selected Champion:", champion);
  };

  const handleInputWrapperClick = () => {
    // Clear the input and reset filtered champions when the input-wrapper is clicked
    search("");
    setFilteredChampions(champions);
  };
  return (
    <div className="input-wrapper" onClick={handleInputWrapperClick}>
      <FaSearch id="search-icon" />
      <input
        value={input}
        onChange={handleInputChange}
      />
      {input && !selectedChampion && (
        <div className="dropdown-menu">
          {filteredChampions.map(champion => (
            <div
              key={champion.id}
              className="dropdown-item"
              onClick={() => handleChampionClick(champion)}
            >
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image.full}`}
                alt={champion.name}
              />
              {champion.name}
            </div>
          ))}
        </div>
      )}
      {selectedChampion && (
        <div>
          <p>Selected Champion: {selectedChampion.name}</p>
          {/* You can display additional information about the selected champion here */}
        </div>
      )}
    </div>
  );
};
