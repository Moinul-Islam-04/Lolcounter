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

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type the name of your champion"
        value={input}
        onChange={handleInputChange}
      />
      <div className="dropdown-menu">
        {filteredChampions.map(champion => (
          <div key={champion.id} className="dropdown-item">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image.full}`}
              alt={champion.name}
            />
            {champion.name}
          </div>
        ))}
      </div>
    </div>
  );
};
