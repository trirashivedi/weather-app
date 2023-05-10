import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import "./style.css";


const SearchWeather = () => {
  const [search,setSearch]=useState("London");
  const [data,setData]=useState([]);
  const [input,setInput]=useState("");
 let componentMounted = true;

  useEffect(()=>{
    const fetchWeather = async()=>{
      // const response = await fetch(`https://provider-api.promptapi.com/provider/stats`);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=bc7c3f6a7e4030441855b55dd76873ec`);
      if(componentMounted){
        setData(await response.json());
        // console.log(data);
      }
      return() => {
        componentMounted = false;
      }
    }
    fetchWeather();
  }, [search]);


   let emoji = null;
   if(typeof data.main != "undefined"){
    if(data.weather[0].main === "Clouds"){
      emoji= "fa-cloud";
     }else if(data.weather[0].main === "Thunderstorm"){
      emoji= "fa-bolt";
     }else if(data.weather[0].main === "Drizzle"){
      emoji= "fa-cloud-sun-rain";
     }
     else if(data.weather[0].main === "Rain"){
      emoji= "fa-cloud-showers-heavy";
    }else if(data.weather[0].main === "Snow"){
      emoji= "fa-snowflake-o";
    }else{
      emoji= "fa-smog";
    }
   }else{
    return(<div>.......loading</div>)
   }
  

  //  console.log(data);
  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

   //date 
   let d = new Date();
   let date = d.getDate();
   let year = d.getFullYear();
   let month = d.toLocaleString("default",{month:'long'});
   let day = d.toLocaleString("default",{weekday:'long'});

   //time
   let time = d.toLocaleString([],{
       hour:'2-digit',
       minute:'2-digit',
       second:'2-digit'
     });
 
      const handleSubmit = (event) =>{
        event.preventDefault();
        setSearch(input);
      }

  return (
    <div className='searchWeather w-45'>
       <div className='container justify-content-center'>
          <div className='row'>
              <Card className="text-white justify-content-center border-0">
              <Card.Img  src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} />
                <Card.ImgOverlay>
                  <form onSubmit={handleSubmit}>
                      <InputGroup className="mb-3 w-75 mx-auto ">
                      <Form.Control type="search"
                      placeholder="Search city"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2" name='search'value={input} onChange={(e)=>setInput(e.target.value)} required
                      />
                      <button type='submit' className='border-0 p-3' id="basic-addon2">
                         <BsSearch />
                      </button>
                      </InputGroup>
                  </form>
                  <div className=' card-content-bg bg-dark opacity-50 mx-3'>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>
                   {day},{month} {date},{year}
                   <br/>
                   {time}
                </Card.Text>
                <hr />
                {/* <Card.Text>Last updated 3 mins ago</Card.Text> */}
                 <div className='cloud'>
                    <i className={`fas ${emoji}>`}></i>
                  </div>
                  <h1>{temp} &deg;C </h1>
                  <p className='lead' >{data.weather[0].main}</p>
                  <p className='lead'> {temp_min}&deg;C  |  {temp_max}&deg;C</p>
                </div>
                </Card.ImgOverlay>
              </Card>
          </div>
       </div>
    </div>
  )
}

export default SearchWeather