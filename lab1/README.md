#Lab 1

## About
For this lab I utlized JQuery, CSS3, and HTML5 to create a ticker to display tweets. Every three seconds, a new tweet is displayed and the top one is removed.

## Creativity
To enahcne my project, I created several regular expressions to parse each tweet to find links, mentions, and hashtags. The content of each tweet is thus rich and interactive. I also added drop shadows to each tweet, so as to give the user a sense of space when hovering over tweets. Each tweet also has a different background. This is pulled from the profile of each user to create a unique experience in the ticker.

## Coding Considerations
The code is organized such that no HTML must be set up in the HTML file, creating more modularity. Repetitive code is kept to a minimum as well. Ideally, I would have liked to seperate the ticker function from the AJAX call, but I ran into scoping issues. I also realized late into my work that I could have recieved a list of mentions/hashtags/links via the 'API'. Moving forward, I would like to evaluate that option and determine if it is a better solution in terms of performance.