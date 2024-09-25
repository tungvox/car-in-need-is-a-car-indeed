import { useState } from 'react';
import { TextField, Button, Box, Chip } from '@mui/material';
import { Vehicle } from '../types'; // Adjusted path to the types file

const SearchBar = ({ vehicles, onFilter }: { vehicles: Vehicle[]; onFilter: (filteredVehicles: Vehicle[]) => void; }) => {
  const [query, setQuery] = useState('');
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const handleSearch = () => {
    if (query && !searchTags.includes(query)) {
      setSearchTags((prevTags) => [...prevTags, query]);
    }
    filterVehicles([...searchTags, query]); // Filter vehicles based on all tags including the new query
    setQuery(''); // Clear the input after search
  };

  const filterVehicles = (tags: string[]) => {
    const filtered = vehicles.filter(vehicle =>
      tags.length === 0 || tags.some(tag =>
        vehicle.make.toLowerCase().includes(tag.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(tag.toLowerCase()) ||
        vehicle.description?.toLowerCase().includes(tag.toLowerCase())
      )
    );
    onFilter(filtered); // Pass the filtered vehicles back to the parent
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = searchTags.filter((tag) => tag !== tagToDelete);
    setSearchTags(updatedTags);
    filterVehicles(updatedTags); // Re-filter vehicles based on remaining tags
  };

  const handleClear = () => {
    setQuery('');
    setSearchTags([]);
    onFilter(vehicles); // Reset to show all vehicles
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" mb={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: '5px', padding: '10px', margin: "16px 10px" }}>
      <Box display="flex" mb={1}>
        <TextField
          variant="outlined"
          placeholder="Search vehicles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          sx={{ mr: 1, flexGrow: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '36px' } }} 
        />
        <Button variant="contained" onClick={handleSearch} sx={{ borderRadius: '8px', mr: 1, height: '36px' }}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleClear} sx={{ borderRadius: '8px', height: '36px' }}>
          Clear
        </Button>
      </Box>
      <Box>
        {searchTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            sx={{ marginRight: 1, marginBottom: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SearchBar;
