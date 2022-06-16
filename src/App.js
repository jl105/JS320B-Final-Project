import './App.css';
// import React, { useEffect, useState } from "react";
import React from "react";
import {Link, BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import BirdProfile from './BirdProfile';
// import birdList from './eBirdResponse.json'
import Home from './Home';
import BirdList from './BirdList';
import Nav from './Nav';

// const Home = () => <h2>Birds List</h2>;

// const BirdProfilePage = () => {
//   const {idx} = useParams();
//   return (
//       <div>
//           <BirdProfile userName={idx} />
//       </div>
//   );
// };

function App() {
  // const [birdList, setBirdList] = useState([]);
  // const [isLoading, setIsLoading ] = useState(true);
  // const [hasError, setHasError] = useState(false);
  
  // useEffect(() => {
  //   fetch(`https://api.ebird.org/v2/data/obs/KZ/recent X-eBirdApiToken:${process.env.eBirdApiToken}`)
  //   .then(response => response.json())
  //   .then(
  //       data => {
  //           console.log(data.results);
  //           setBirdList(data.results);
  //           setIsLoading(false);
  //       },
  //       error => {
  //           console.log(error);
  //           setHasError(true);
  //           setIsLoading(false);
  //       }
  //   );

  // }, []);

//   if (isLoading) {
//     return <p>Loading...</p>
// }

// if (hasError) {
//     return <p>An error occurred, please try again later.</p>
// }

// const birdItems = birdList.map((bird, idx) => {
//     return (
//         <li key={idx}><a href='#'>{bird.comName}</a></li>
//     );
// });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/birdlist" element={<BirdList />} />
          <Route path="/birdlist/:id" element={<BirdProfile />} />
      </Routes>
      <Nav />
      {/* <ul>
          {birdItems}
      </ul> */}
    </div>
  );
}

export default App;
