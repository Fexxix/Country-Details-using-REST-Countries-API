# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

This was pretty challenging, all because the json response from the API and the data.json didn't have the same structure. That caused me a whole lot of confusion, to say the least. That's why I ended up with only one file. I thought this wouldn't take any more than 200-250 lines of TS code but who would have known that the data.json and the API respone won't match up. I mostly regret tackling this project, not the best experience I've had while coding. I wanted to use data.json to populate the HTML Page and the API for the search function so I had to go through the trouble. I could have just created an interface and then just make a whole new object of that interface every time I had to load a country card, it's details or use the search function but I just winged it. Since the json format had inconsistencies, my code, naturally is also inconsistent but I tried to keep the TS errors to a minimum. For the time being, there aren't any errors that stop compilation.

I also was going to implement the theme switching feature but I just want to be done with this.

And if you are thinking about doing this project, please use only the data.json or the API. Mixing them up will just cost you extra effort and will make you confused.

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://github.com/Fexxix/Country-Details-using-REST-Countries-API)
- Live Site URL: [Add live site URL here](https://fexxix.github.io/Country-Details-using-REST-Countries-API/)

## My process

### Built with

- Semantic HTML5 markup
- SASS
- Flexbox
- CSS Grid
- TypeScript
- Vite
- REST Countries API [Site Link](https://restcountries.com/#filter-response)

### What I learned

I learned that consistency is important in coding.

### Continued development

I will learn about the backend and will make a full stack web site in the near future.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Frontend Mentor - [@Fexxix](https://www.frontendmentor.io/profile/Fexxix)
