interface User {
  // Define the structure of the user object if known
  [key: string]: string; 
}

interface StoreState {
  id: number;
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
}