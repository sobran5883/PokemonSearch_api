import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Header = ({ searchQuery, handleSearchChange }) => {

  return (
    <header className="pt-4 pb-4 bg-[#211e32] sticky top-0 z-50 flex items-center justify-center">
      <div className="w-10/12 mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div className="">
          <Link to='/'>
            <h1 className="text-[#4E52C1] font-bold text-2xl md:text-4xl">Pok<span className="text-red-600">emon</span></h1>
          </Link>
        </div>
        <div className="w-full flex md:justify-end">
          <input
            className='px-2 py-1 md:py-2 rounded-sm outline-none md:w-4/12 bg-[#211e32] text-white border border-white'
            type="text"
            placeholder='search here...'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
