package com.news.news;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class NewsController {

    private static final String API_KEY = "Your API key"; // Replace with your News API key
    private static final String NEWS_API_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";

    @GetMapping("/news")
    public String getNews(@RequestParam(required = false) String category) {
        String url = NEWS_API_URL + API_KEY;
        if (category != null && !category.isEmpty()) {
            url += "&category=" + category;
        }

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}
