import React from 'react';

const About = props => {
    return(
      <div className="my-1">
        <div className='profile-about bg-primary p-3'>
          <h1 className='large'>What is FakeNews?</h1>
        </div>
        <div className='about bg-light p-1 about'>
          <p>
            Have you ever felt disenfranchised by our current media lanscape? Do
            you feel that there are things going on in this world that the
            biased news sources are refusing to cover? Well, look no further,
            there is FakeNews. We here at FakeNews attempt to uncover the real
            truths in this world by allowing our users (colleagues) to report
            on the issues that truly matter. Posts typically cover subjects such
            as: Chemtrails, The Deep State, Globalist Conspiracies,
            Animal Crossing, Flat Earth, Group Stalking, and much more. We
            give you the freedom of spreading the truth without the criticism
            of ignorant sheepeople. Have fun, and may reason prevail.
          </p>
        </div>
      </div>
    );
}

export default About;
