---
inclusion: fileMatch
fileMatchPattern: 'app/components/**/*.tsx'
---

# Accessibility Standards for Universal Skill Translator

## WCAG 2.1 AA Compliance Requirements

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Implement proper tab order and focus management
- Provide visible focus indicators
- Support standard keyboard shortcuts

### Screen Reader Support
- Use semantic HTML elements (headings, lists, buttons)
- Provide descriptive alt text for images and icons
- Implement proper ARIA labels and descriptions
- Ensure content is logically structured

### Color and Contrast
- Maintain minimum contrast ratio of 4.5:1 for normal text
- Use color plus additional indicators (icons, text) for information
- Test with color blindness simulators
- Provide high contrast mode support

### Responsive Design
- Ensure content is accessible at 200% zoom
- Support both portrait and landscape orientations
- Maintain functionality on mobile devices
- Test with various screen sizes and resolutions

### Content Accessibility
- Use clear, simple language appropriate for skill level
- Provide multiple ways to access the same information
- Include captions for video content
- Offer text alternatives for audio content

### Interactive Elements
- Provide clear labels for form inputs
- Include error messages and validation feedback
- Ensure buttons and links have descriptive text
- Implement proper loading states and progress indicators

### Testing Requirements
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Validate with automated accessibility tools
- Conduct manual keyboard navigation testing
- Verify color contrast compliance

### Implementation Checklist
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (h1-h6)
- [ ] Alt text for all images
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Color contrast validation
- [ ] Screen reader testing
- [ ] Mobile accessibility verification