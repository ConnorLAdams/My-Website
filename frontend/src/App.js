// import logo from './logo.svg';
import './App.css';
import ImageComponent from './Icon';
import TabIcon from './Icon2';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = './public/Red_Panda_Tab.png';
    document.head.appendChild(link);
  }, []);
  return (
    <div className="Home" style={{backgroundColor: "lightblue"}}>
      <TabIcon />
      <body height="100" width="100"  style={{backgroundColor: "gray"}}>
          <ImageComponent />
        <section className="Education">
            <h1>Education Path</h1>
            <div class="row">
                <div class="about-col">
                    <h3>BS in Applied Mathematics</h3>
                    <p>
                        I attended Cal Poly Pomona from 2016-2020 where I received a Bachelor's Degree in
                        Applied Mathematics. Some of my most influential instructors were
                        Dr. Berit Givens, Dr. John Rock, Dr. Jennifer Switkes, and
                        Dr. Nakashima. It wasn't only the subject material that I learned from them, but
                        how to understand, read, and develop mathematical theories/ideas.
                    </p>
                </div>
                <div class="about-col">
                    <h3>MS in Applied Mathematics</h3>
                    <p>
                        During my Master's Program, I focused heavily on Mathematical and Statistical
                        modeling. For my thesis, I researched and modeled the population growth of a pair
                        of interactive species, Alaskan Brown Bears and Pacific Salmon, as their environmental
                        climate changes. I have also participated in statistical modeling competitions and
                        used machine learning to predict residential building prices and determine who survived
                        disasters.
                    </p>
                </div>
                <div class="about-col">
                    <h3>Post Graduation</h3>
                    <p>
                        Now that I have received my Master's Degree, I am working toward becoming a
                        machine learning engineer. I would like to begin by working as a data analyst where
                        I can learn more about building and managing data pipelines. My time as a Graduate
                        Teaching Associate gave me a passion for teaching, so if I can in the future, I
                        would like to pursue a part-time career in teaching mathematics at a community college.
                    </p>
                </div>
            </div>
        </section>
      </body>
    </div>
  );
}

export default App;
