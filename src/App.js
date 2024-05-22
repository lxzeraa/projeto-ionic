import React from 'react';
import axios from 'axios';

const apiMovies = axios.create({
  baseURL:
    'https://api.themoviedb.org/3/movie/popular?api_key=8426a1374a213b578abf04fbd0c08f8a&language=pt-BR&page=1',
});

export default class App extends React.Component {
  state = {
    listMovies: [],
  };

  async componentDidMount() {
    const response = await apiMovies.get();
    console.log(response.data.results);

    const movies = response.data.results.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
      };
    });
    this.setState({
      listMovies: movies,
    });
  }

  render() {
    return (
      <div>
        <h1>Filmes</h1>
        {this.state.listMovies.map((item) => (
          <ul>
            <li>{item.title}</li>
            <li>
              <img
                src={item.poster_path}
                alt={`Imagem do filme ${item.title}`}
              />
            </li>
            <li>{item.overview}</li>
          </ul>
        ))}
      </div>
    );
  }
}
