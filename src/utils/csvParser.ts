import Papa from 'papaparse';
import { Candidate } from '../types';

export const parseCandidatesCSV = (file: File): Promise<Candidate[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const candidates: Candidate[] = results.data.map((row: any) => ({
          id: row.id || Date.now().toString(),
          name: row.name,
          role: row.role,
          location: row.location,
          experience: parseInt(row.experience) || 0,
          skills: row.skills.split(',').map((skill: string) => skill.trim()),
          salary: parseInt(row.salary) || 0,
          availability: row.availability || 'immediate',
          rating: parseFloat(row.rating) || 4.0,
          image: row.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=0D8ABC&color=fff`
        }));
        resolve(candidates);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};