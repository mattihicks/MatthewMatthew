# Personal Website

A minimalist personal website to showcase your interests, writing, and creative work.

## What's Included

- **About Me**: Personal introduction and biography
- **Music**: Share your current listens and all-time favorites
- **Photos**: Display your photography in a clean grid
- **Writing**: Blog posts and articles
- **Newsletter**: Link to your newsletter signup

## Customization Guide

### 1. Update Your Information

Edit `index.html` and replace:
- "Your Name" with your actual name (appears in navigation and title)
- "your.email@example.com" with your email address
- "https://your-newsletter-link.com" with your actual newsletter URL
- Fill in the About Me section with your personal bio
- Add your music interests and favorite albums
- Replace blog post placeholders with your actual content

### 2. Add Photos

Replace the photo placeholders with actual images:
1. Add your images to a new `images/` folder
2. Replace `<div class="photo-placeholder">` sections with:
   ```html
   <img src="images/your-photo.jpg" alt="Description">
   ```

### 3. Customize Colors and Fonts

Edit `style.css`:
- Primary text color: `#2c2c2c`
- Secondary text color: `#5a5a5a`
- Accent colors: Adjust `.newsletter-button` background
- Font: Currently uses system fonts, but you can add Google Fonts

### 4. Preview Locally

Open `index.html` in your web browser to see how it looks.

## Deployment Options

### GitHub Pages (Free & Easy)

1. Create a new GitHub repository
2. Upload these files to the repository
3. Go to Settings > Pages
4. Select "main" branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Free with Custom Domain)

1. Sign up at netlify.com
2. Drag and drop your folder to deploy
3. Optionally connect a custom domain
4. Automatic HTTPS included

### Other Options

- **Vercel**: Similar to Netlify, drag-and-drop deployment
- **Surge.sh**: Command-line deployment tool
- **Traditional hosting**: Upload via FTP to any web host

## File Structure

```
personal-website/
├── index.html          # Main HTML file
├── style.css           # All styling
└── README.md          # This file
```

## Tips for Content

- Keep your About Me section concise and engaging
- Update your music section regularly with new discoveries
- Write authentically in your blog posts
- Use high-quality photos (recommended size: 1200x900px)
- Keep your newsletter description compelling but brief

## Browser Support

This website works on all modern browsers including:
- Chrome, Firefox, Safari, Edge
- Mobile browsers (fully responsive)

Enjoy your new website!
