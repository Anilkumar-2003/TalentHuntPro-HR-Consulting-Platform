import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchFilters from '../components/common/SearchFilters';
import CandidateCard from '../components/common/CandidateCard';
import AddCandidateModal from '../components/candidate/AddCandidateModal';
import { candidateFilters } from '../data/mockData';
import { Candidate } from '../types';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const CandidateAnalytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    filterCandidates();
  }, [searchTerm, appliedFilters, candidates]);

  const fetchCandidates = async () => {
    try {
      const data = await api.candidates.getAll();
      setCandidates(data);
    } catch (error) {
      toast.error('Failed to fetch candidates');
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCandidates = () => {
    let filtered = [...candidates];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(searchLower) ||
        candidate.role.toLowerCase().includes(searchLower) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    // Applied filters
    Object.entries(appliedFilters).forEach(([filterName, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(candidate => {
          switch (filterName) {
            case 'Role':
              return values.some(value => candidate.role.toLowerCase().includes(value.toLowerCase()));
            case 'Location':
              return values.some(value => candidate.location.toLowerCase().includes(value.toLowerCase()));
            case 'Experience':
              const [min, max] = values[0].split('-').map(Number);
              return candidate.experience >= min && (max ? candidate.experience <= max : true);
            case 'Availability':
              return values.includes(candidate.availability);
            case 'Skills':
              return values.some(value => 
                candidate.skills.some(skill => skill.toLowerCase().includes(value.toLowerCase()))
              );
            default:
              return true;
          }
        });
      }
    });

    setFilteredCandidates(filtered);
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setAppliedFilters(filters);
  };

  const handleAddCandidate = async (newCandidate: Candidate) => {
    try {
      await api.candidates.add(newCandidate);
      await fetchCandidates(); // Refresh the list
      toast.success('Candidate added successfully!');
    } catch (error) {
      toast.error('Failed to add candidate');
      console.error('Error adding candidate:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading candidates...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Candidate Analytics</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Search, analyze, and manage your talent pipeline.
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
          >
            Add candidate
          </button>
        </div>
      </div>
      
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Search candidates by name, role, skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <SearchFilters 
        filters={candidateFilters} 
        onFilterChange={handleFilterChange} 
      />
      
      {filteredCandidates.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            {candidates.length === 0 ? 'No candidates found. Add some candidates to get started.' : 'No candidates match your search criteria.'}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
      
      <div className="flex justify-center mt-8">
        <nav className="flex items-center">
          <button className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2">
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-2 rounded-md text-sm font-medium mx-1 ${
                page === 1
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-2">
            Next
          </button>
        </nav>
      </div>

      <AddCandidateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCandidate}
      />
    </div>
  );
};

export default CandidateAnalytics;