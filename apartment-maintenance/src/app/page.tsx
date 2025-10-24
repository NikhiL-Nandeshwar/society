import React from 'react';
import Login from './login/page';

const Home: React.FC = () => {
    return (
        <div>
            {/* <h1 className='flex justify-center mt-8 mb-0 font-bold'>Welcome to the Login Widget</h1> */}
            <Login />
        </div>
    );
};

export default Home;