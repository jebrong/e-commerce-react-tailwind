import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// local data

import products from "../../data/furn";
import { featured } from "../../data/furn";

export const getProductItems = createAsyncThunk(
  "product/getProductItems",
  async (name, thunkAPI) => {
    try {
      const res = await axios("/api/products");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const initialState = {
  // productsAll: products,
  productsAll: products,
  filteredArtists: [],
  sortedProducts: products,
  searchInput: "",
  isLoading: false,
  example: "",
  singleProduct: null,
  postsPerPage: 8,
  currentPage: 1,
  showProducts: [],
  allPages: [],
  sortBy: "default",
  showFilters: false,

  // for single Products Page
  productImages: [],
  selectedPhoto: "",

  // for home
  featuredProducts: featured,
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, actions) => {
      let tempoProducts = [];

      const artist = actions.payload?.artist;
      const search = actions.payload?.search;

      if (artist) {
        state.currentPage = 1;
        tempoProducts = state.productsAll;
        if (state.searchInput) {
          // sortedProducts are sorted by searchInput
          state.sortedProducts = tempoProducts.filter((item) => {
            return item.title.toLowerCase().includes(state.searchInput);
          });

          // adjusts the filteredArtists arr
          if (state.filteredArtists.includes(artist)) {
            state.filteredArtists = state.filteredArtists.filter(
              (itemArtist) => {
                return itemArtist !== artist;
              }
            );
          } else if (!state.filteredArtists.includes(artist)) {
            state.filteredArtists = [...state.filteredArtists, artist];
          }
          // filter based on searchInput and filteredArtists
          state.sortedProducts = tempoProducts.filter((item) => {
            return state.filteredArtists.includes(item.artist);
          });
        } else {
          if (state.filteredArtists.includes(artist)) {
            state.filteredArtists = state.filteredArtists.filter(
              (itemArtist) => {
                return itemArtist !== artist;
              }
            );
          } else if (!state.filteredArtists.includes(artist)) {
            state.filteredArtists = [...state.filteredArtists, artist];
          }
          if (state.filteredArtists.length === 0) {
            state.sortedProducts = tempoProducts;
          } else {
            state.sortedProducts = tempoProducts.filter((item) => {
              return state.filteredArtists.includes(item.artist);
            });
          }
        }
      }
      // for search from submit
      if (search) {
        state.currentPage = 1;
        state.filteredArtists = [];

        tempoProducts = state.productsAll;
        state.sortedProducts = tempoProducts.filter((item) => {
          return item.title.toLowerCase().includes(state.searchInput);
        });
        // adds filteredArtists based on sortedProducts with no repeat
        let tempoArtists = state.sortedProducts.map((item) => {
          return item.artist;
        });
        state.filteredArtists = [...new Set(tempoArtists)];
      }
      // clicked with artist null
      if (!artist && !search) {
        state.currentPage = 1;
        tempoProducts = state.productsAll;
        state.filteredArtists = [];
        state.sortedProducts = tempoProducts.filter((item) => {
          return item.title.toLowerCase().includes(state.searchInput);
        });
      }
      state.sortBy = "default";
    },
    resetFilter: (state) => {
      state.filteredArtists = [];
      state.searchInput = "";
      state.currentPage = 1;
      state.sortedProducts = state.productsAll;
    },

    sortProducts: (state, actions) => {
      const { payload } = actions;
      state.sortBy = payload;
      let tempoArtists = [];
      //   descending price
      if (state.sortBy === "price-") {
        state.sortedProducts = [...state.sortedProducts].sort(
          (a, b) => b.price - a.price
        );
      }
      //   ascending price
      else if (payload === "price+") {
        state.sortedProducts = [...state.sortedProducts].sort(
          (a, b) => a.price - b.price
        );
      }

      //   descending name
      else if (payload === "name-") {
        state.sortedProducts = [...state.sortedProducts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }
      //   ascending name
      else if (payload === "name+") {
        state.sortedProducts = [...state.sortedProducts].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }

      //   descending artist
      else if (payload === "artist-") {
        state.sortedProducts = [...state.sortedProducts].sort((a, b) =>
          a.artist.localeCompare(b.artist)
        );
      }
      //   ascending artist
      else if (payload === "artist+") {
        state.sortedProducts = [...state.sortedProducts].sort((a, b) =>
          b.artist.localeCompare(a.artist)
        );
      }

      // adds filteredArtists based on sortedProducts with no repeat
      // tempoArtists = state.sortedProducts.map((item) => {
      //   return item.artist;
      // });
      // state.filteredArtists = [...new Set(tempoArtists)];
      state.currentPage = 1;
    },

    changeSortBy: (state, action) => {
      const { payload } = action;
      state.sortBy = payload;
    },

    searchProducts: (state, action) => {
      const { payload } = action;
      state.searchInput = payload;
    },
    findSingleProduct: (state, action) => {
      const { payload } = action;
      state.singleProduct = state.productsAll.find((item) => {
        return item.id === payload;
      });

      state.selectedPhoto = state.singleProduct.img[0];

      state.productImages = state.singleProduct.img;
    },

    pagination: (state) => {
      const lastPostIndex = state.currentPage * state.postsPerPage;
      const firstPostIndex = lastPostIndex - state.postsPerPage;
      state.showProducts = state.sortedProducts.slice(
        firstPostIndex,
        lastPostIndex
      );

      let tempPages = [];
      for (
        let index = 1;
        index <= Math.ceil(state.sortedProducts.length / state.postsPerPage);
        index++
      ) {
        tempPages.push(index);
      }
      state.allPages = tempPages;
    },
    nextPage: (state) => {
      if (state.currentPage < state.allPages.length) {
        ++state.currentPage;
      } else {
        return;
      }
    },
    prevPage: (state) => {
      if (state.currentPage === 1) {
        return;
      } else {
        --state.currentPage;
      }
    },

    jumpPage: (state, action) => {
      const { payload } = action;
      state.currentPage = payload;
    },

    changePostsPerPage: (state, action) => {
      const { payload } = action;
      state.postsPerPage = payload;
    },

    toggleFilters: (state) => {
      state.showFilters = !state.showFilters;
    },

    prevSingleImage: (state) => {
      const currentImageIndex = state.productImages.findIndex((img) => {
        return img === state.selectedPhoto;
      });
      const newCurrentImageIndex = () => {
        if (currentImageIndex < 1) {
          return state.productImages.length - 1;
        } else {
          return currentImageIndex - 1;
        }
      };
      state.selectedPhoto = state.productImages[newCurrentImageIndex()];
    },
    nextSingleImage: (state) => {
      const currentImageIndex = state.productImages.findIndex((img) => {
        return img === state.selectedPhoto;
      });
      const newCurrentImageIndex = () => {
        if (currentImageIndex === state.productImages.length - 1) {
          return 0;
        } else {
          return currentImageIndex + 1;
        }
      };
      state.selectedPhoto = state.productImages[newCurrentImageIndex()];
    },

    selectSingleImage: (state, action) => {
      const { payload } = action;
      state.selectedPhoto = state.productImages[payload];
    },

    // end of reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductItems.fulfilled, (state, action) => {
        state.isLoading = false;

        state.productsAll = action.payload;
        state.sortedProducts = action.payload;
      })
      .addCase(getProductItems.rejected, (state, action) => {
        state.isLoading = false;
        state.productsAll = products;
        state.sortedProducts = products;
      });
  },
});

export const productsReducer = productsSlice.reducer;

export const {
  filterProducts,
  resetFilter,
  sortProducts,
  searchProducts,
  findSingleProduct,
  pagination,
  nextPage,
  prevPage,
  jumpPage,
  changePostsPerPage,
  changeSortBy,
  toggleFilters,
  prevSingleImage,
  nextSingleImage,
  selectSingleImage,
} = productsSlice.actions;
