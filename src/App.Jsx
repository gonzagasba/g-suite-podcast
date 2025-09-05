import React, { useState, useEffect, useMemo } from 'react';
import { Search, Play, Filter, ExternalLink, Github, MapPin, Clock, Calendar, Tag, Star, Users, BarChart3 } from 'lucide-react';

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/api/episodes.json`);
        const data = await response.json();
        setEpisodes(data.episodes || []);
        setLoading(false);
      } catch (error) {
        console.error('Error loading episodes:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const themes = [
    'all',
    'Entrepreneurship & Innovation',
    'Finance & Accounting',
    'Leadership & Management',
    'Academic Excellence',
    'International Business',
    'Technology & Digital Transformation',
    'Social Impact',
    'Sports & Entertainment'
  ];

  const seasons = ['all', 'ONE', 'TWO', 'THREE', 'FOUR'];

  const filteredEpisodes = useMemo(() => {
    return episodes.filter(episode => {
      const matchesSearch = episode.guest?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           episode.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           episode.shortDesc?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTheme = selectedTheme === 'all' || episode.themes?.includes(selectedTheme);
      const matchesSeason = selectedSeason === 'all' || episode.season === selectedSeason;
      
      return matchesSearch && matchesTheme && matchesSeason;
    });
  }, [searchTerm, selectedTheme, selectedSeason, episodes]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-900 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading G-Suite Podcast</h2>
          <p className="text-gray-500">Fetching episodes from GitHub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-5xl font-bold mb-3">G-Suite Podcast</h1>
              <p className="text-blue-100 text-xl mb-2">Your hub for all things Zag Business</p>
              <p className="text-blue-200">
                In-depth conversations with Gonzaga School of Business Administration graduates, faculty, and friends
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-blue-200">
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {episodes.length} Episodes
                </span>
                <span className="flex items-center gap-1">
                  <BarChart3 size={16} />
                  9 Themes
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  4 Seasons
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://g-suite.castos.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Play size={18} />
                <span className="hidden sm:inline">Listen on Castos</span>
              </a>
              <a 
                href="https://github.com/gonzagasba/g-suite-podcast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Github size={18} />
                <span className="hidden sm:inline">View Source</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search episodes, guests, topics..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
              >
                {themes.map(theme => (
                  <option key={theme} value={theme}>
                    {theme === 'all' ? 'All Themes' : theme}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
              >
                {seasons.map(season => (
                  <option key={season} value={season}>
                    {season === 'all' ? 'All Seasons' : `Season ${season}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            Showing <span className="font-bold">{filteredEpisodes.length}</span> of{' '}
            <span className="font-bold">{episodes.length}</span> episodes
          </p>
        </div>

        <div className="space-y-6">
          {filteredEpisodes.map(episode => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>

        {filteredEpisodes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No episodes found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-blue-200">© 2025 Gonzaga University School of Business Administration</p>
          <p className="text-blue-300 mt-2">Hosted on GitHub Pages • Open Source • ArcGIS Ready</p>
        </div>
      </footer>
    </div>
  );
};

const EpisodeCard = ({ episode }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-lg border-l-4 border-blue-900 hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-900 text-white px-2 py-1 rounded text-sm font-semibold">
                Season {episode.season} • Episode {episode.episode}
              </span>
              {episode.duration && (
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock size={14} />
                  {episode.duration}
                </span>
              )}
              {episode.location && (
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <MapPin size={14} />
                  {episode.location.city}, {episode.location.state}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">{episode.guest}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{episode.shortDesc}</p>
          </div>
        </div>

        {episode.themes && episode.themes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {episode.themes.map(theme => (
              <span key={theme} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                {theme}
              </span>
            ))}
          </div>
        )}

        {episode.aidaWriteup && (
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl mb-6">
            <h4 className="text-blue-900 font-bold text-xl mb-4 leading-tight">
              {episode.aidaWriteup.attention}
            </h4>
            {expanded && (
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{episode.aidaWriteup.interest}</p>
                {episode.aidaWriteup.desire && (
                  <p className="text-gray-700 leading-relaxed">{episode.aidaWriteup.desire}</p>
                )}
                {episode.aidaWriteup.action && (
                  <p className="text-red-600 font-semibold text-lg leading-relaxed">{episode.aidaWriteup.action}</p>
                )}
              </div>
            )}
          </div>
        )}

        {episode.tags && episode.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {episode.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-900 hover:text-blue-700 font-semibold transition-colors flex items-center gap-2"
          >
            {expanded ? '📖 Show Less' : '📖 Read Full Writeup'}
          </button>
          
            href={episode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-3 rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all duration-200 flex items-center gap-3 font-semibold"
          >
            <Play size={18} />
            Listen Now
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;