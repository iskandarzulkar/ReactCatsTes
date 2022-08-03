import React, { useEffect, useState } from 'react'
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import Collapsible from 'react-collapsible';

export const CatsList = () => {

  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);

  const [page, setpage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getComments = async () =>{
      // const res = await fetch(
      //   `https://api.thecatapi.com/v1/breeds`
      // );
      const res = await axios.get(
        `https://api.thecatapi.com/v1/breeds?page=1&limit=10`
      );

      const data = await res.data;
      console.log(data);
      setItems(data);
    }
    getComments();
  }, []);

  const fetchComments = async () =>{
    const res = await axios.get(
      `https://api.thecatapi.com/v1/breeds?page=${page}&limit=10`
    );
    const data = await res.data;
    console.log(data);
    return data;
  }

  const fetchData = async () => {
    const commentsFormServer = await fetchComments();

    setItems([...items, ...commentsFormServer]);
    if (commentsFormServer.length === 0 || commentsFormServer.length < 10) {
      sethasMore(false);
    }
    setpage(page + 1);
  };

  return (
    <div className='container mt-5'>
      <div className='columns'>
        <div className='column is-centered'>
            <div className='field has-addons'>
              <div className='control is-expanded'>
                  <input type="text" className="input" placeholder="Find Something Here...!" onChange={(event)=>{ setSearchTerm(event.target.value); }}  />
              </div>
              <div className='control'>
                  <button type='submit' className='button is-info'>Search</button>
              </div>
            </div>
        </div>
      </div>
      
      
      <div className='columns'>
        <div className='column is-centered'>

        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          // endMessage={
          //   <p style={{ textAlign: 'center' }}>
          //     <b>Yay! You have seen it all</b>
          //   </p>
          // }
        >

        {items.filter((val)=>{
          if(searchTerm == ""){
            return val
          }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
          }
        }).map((item, index)=>(
          <div className='column'>
            <div class="card" key={index}>
              <header class="card-header">
                <p class="card-header-title">
                  {index+1}
                </p>
                <button class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </header>

              <div class="card-content">
                <div class="media">
                  <div class="media-left">

                    <figure class="image is-64x64">
                      <img src={item.image.url} />
                    </figure>

                  </div>
                  <div class="media-content">
                    <p class="title is-4">{item.id}</p>
                    <p class="subtitle is-6">{item.name}</p>
                  </div>
                </div>

                <div class="content">
                  {item.description}
                </div>

              </div>

              <div class="card-content">
                <Collapsible trigger="View Detail" class="Tes">
                <table className='table is-striped is-bordered is-fullwidth mt-2'>
                    <tr>
                      <th><abbr title="Position">ID</abbr></th>
                      <td>{item.id}</td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td>{item.name}</td>
                    </tr>
                    <tr>
                      <th>Cfa Url</th>
                      <td><a href={item.cfa_url} >{item.cfa_url}</a></td>
                    </tr>
                    <tr>
                      <th>Vetstreet Url</th>
                      <td><a href={item.vetstreet_url}>{item.vetstreet_url}</a></td>
                    </tr>
                    <tr>
                      <th>Vcahospitals Url</th>
                      <td><a href={item.vcahospitals_url}>{item.vcahospitals_url}</a></td>
                    </tr>
                    <tr>
                      <th>Temperament</th>
                      <td>{item.temperament}</td>
                    </tr>
                    <tr>
                      <th>Origin</th>
                      <td>{item.origin}</td>
                    </tr>
                    <tr>
                      <th>Country Codes</th>
                      <td>{item.country_codes}</td>
                    </tr>
                    <tr>
                      <th>Country Code</th>
                      <td>{item.country_code}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{item.description}</td>
                    </tr>
                    <tr>
                      <th>Life Span</th>
                      <td>{item.life_span}</td>
                    </tr>
                    <tr>
                      <th>Indoor</th>
                      <td>{item.indoor}</td>
                    </tr>
                    <tr>
                      <th>Lap</th>
                      <td>{item.lap}</td>
                    </tr>
                    <tr>
                      <th>Alt Names</th>
                      <td>{item.alt_names}</td>
                    </tr>


                    <tr>
                      <th>Adaptability</th>
                      <td>{item.adaptability}</td>
                    </tr>
                    <tr>
                      <th>Affection Level</th>
                      <td>{item.affection_level}</td>
                    </tr>
                    <tr>
                      <th>Child Friendly</th>
                      <td>{item.child_friendly}</td>
                    </tr>
                    <tr>
                      <th>Dog Friendly</th>
                      <td>{item.dog_friendly}</td>
                    </tr>
                    <tr>
                      <th>Energy Level</th>
                      <td>{item.energy_level}</td>
                    </tr>
                    <tr>
                      <th>Grooming</th>
                      <td>{item.grooming}</td>
                    </tr>


                    <tr>
                      <th>Health Issues</th>
                      <td>{item.health_issues}</td>
                    </tr>
                    <tr>
                      <th>Intelligence</th>
                      <td>{item.intelligence}</td>
                    </tr>
                    <tr>
                      <th>Shedding Level</th>
                      <td>{item.shedding_level}</td>
                    </tr>
                    <tr>
                      <th>Social Needs</th>
                      <td>{item.social_needs}</td>
                    </tr>
                    <tr>
                      <th>Stranger Friendly</th>
                      <td>{item.stranger_friendly}</td>
                    </tr>

                    <tr>
                      <th>Vocalisation</th>
                      <td>{item.vocalisation}</td>
                    </tr>
                    <tr>
                      <th>Experimental</th>
                      <td>{item.experimental}</td>
                    </tr>
                    <tr>
                      <th>Hairless</th>
                      <td>{item.hairless}</td>
                    </tr>
                    <tr>
                      <th>Natural</th>
                      <td>{item.natural}</td>
                    </tr>
                    <tr>
                      <th>Rare</th>
                      <td>{item.rare}</td>
                    </tr>
                    <tr>
                      <th>Rex</th>
                      <td>{item.rex}</td>
                    </tr>
                     
                    <tr>
                      <th>Suppressed Tail</th>
                      <td>{item.suppressed_tail}</td>
                    </tr>
                    <tr>
                      <th>Short Legs</th>
                      <td>{item.short_legs}</td>
                    </tr>
                    <tr>
                      <th>Wikipedia Url</th>
                      <td>
                      <a href={item.wikipedia_url}>{item.wikipedia_url}</a>
                      </td>
                    </tr>

                    <tr>
                      <th>Hypoallergenic</th>
                      <td>{item.hypoallergenic}</td>
                    </tr>
                    <tr>
                      <th>Reference Image Id</th>
                      <td>{item.reference_image_id}</td>
                    </tr>

                  
                </table>
                </Collapsible>
              </div>


            </div>
          </div>
          ))}

          </InfiniteScroll>
        </div>
      </div>
         
    </div>
  )
}
