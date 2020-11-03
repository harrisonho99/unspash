import React from "react";
import SearchBar from "./SearchBar";
import unsplash from "./api/unsplash";
import "../style/App.css";
import ImageList from "./ImageList";
import Loader from "./Loader";

export default class App extends React.Component {
  state = {
    images: [],
    page: 1,
    value: "",
    display: "",
    isLoading: false,
    per_page: 10,
    hasMore: true,
    maxItems: 100
  };

  // handle first axios request
  axiosRequest = async () => {
    this.setState({
      isLoading: true
    });
    let response = await unsplash.get("/search/photos", {
      params: {
        query: this.state.value.toLowerCase(),
        per_page: this.state.per_page,
        page: this.state.page
      }
    });
    this.setState((currentState) => {
      return {
        hasMore: true,
        display: "",
        images: response.data.results,
        page: currentState.page + 1,
        isLoading: false
      };
    });
  };
  //handle fetch data when reach bottom
  fetchMoreData = async () => {
    if (this.state.images.length >= this.state.maxItems) {
      this.setState({
        hasMore: false
      });
      return;
    }
    this.setState({
      isLoading: true
    });
    // make axios request
    let response = await unsplash.get("/search/photos", {
      params: {
        query: this.state.value.toLowerCase(),
        per_page: this.state.per_page,
        page: this.state.page
      }
    });
    //concatenate existing array
    this.setState((currentState) => {
      return {
        images: currentState.images.concat(response.data.results),
        page: currentState.page + 1,
        isLoading: false
      };
    });
  };

  // handle submit
  handleSubmit = async (e) => {
    e.preventDefault();
    //first submit
    if (this.state.display !== "" && this.state.value === "") {
      await this.setState((currentState) => {
        return {
          isLoading: true,
          value: currentState.display
        };
      });
      this.axiosRequest();
    }

    //nth submit
    if (
      this.state.display !== "" &&
      this.state.value !== "" &&
      this.state.display !== this.state.value
    ) {
      await this.setState((currentState) => ({
        isLoading: true,
        value: currentState.display,
        display: ""
      }));
      this.axiosRequest();
    }
  };
  // Smooth scroll top

  // handle text field
  handleInputField = (e) => {
    const inputValue = e.target.value;
    this.setState({
      display: inputValue
    });
  };
  render() {
    return (
      <div className="App">
        <button
          id="top-button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <i class="arrow up icon" id="scrolltop-icon"></i>
        </button>
        <div
          className="input-wrapper ui raised very padded text container segment"
          style={{ padding: 15 }}
        >
          <SearchBar
            handleSubmit={this.handleSubmit}
            handleInput={this.handleInputField}
            inputDispay={this.state.display}
          />
        </div>
        <hr />
        <h2>Result: {this.state.images.length} images.</h2>
        <Loader isLoading={this.state.isLoading} />
        <ImageList
          listImage={this.state.images}
          loader={<Loader />}
          hasMore={this.state.hasMore}
          next={this.fetchMoreData}
        />
      </div>
    );
  }
}
