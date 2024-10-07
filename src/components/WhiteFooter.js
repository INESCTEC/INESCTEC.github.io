import React from 'react';

const WhiteFooter = () => {
  return (
    <>
      <footer className="bg-white text-dark-blue-2 p-4 font-mono">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex space-x-14">
            <a href="https://inesctec.pt" className="hover:underline">Contacts</a>
            <a href="https://inesctec.pt" className="hover:underline">Code of Conduct</a>
            <a href="https://inesctec.pt" className="hover:underline">Copyright</a>
          </div>
          <div className="text-right">
            2024, INESC TEC
          </div>
        </div>
      </footer>
    </>
  );
};

export default WhiteFooter;
