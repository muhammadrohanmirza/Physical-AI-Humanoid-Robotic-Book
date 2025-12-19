# Data Model: Physical AI Book

## Content Entities

### Chapter
- **name**: string - The name of the chapter (e.g., "Introduction to Physical AI")
- **description**: string - A brief description of the chapter's content
- **order**: integer - The position of the chapter in the book sequence
- **lessons**: array of Lesson references - The lessons that belong to this chapter
- **metadata**: object - Additional information like estimated reading time, prerequisites

### Lesson
- **title**: string - The title of the lesson (e.g., "Foundations of Physical AI")
- **content**: string - The markdown content of the lesson
- **chapterId**: string - Reference to the parent chapter
- **order**: integer - The position of the lesson within the chapter
- **handsOnExercise**: Exercise reference - The hands-on exercise associated with this lesson
- **objectives**: array of strings - Learning objectives for this lesson
- **duration**: integer - Estimated time to complete in minutes

### HandsOnExercise
- **title**: string - The title of the exercise
- **description**: string - Detailed description of the exercise
- **instructions**: string - Step-by-step instructions in markdown
- **solution**: string - Solution to the exercise in markdown
- **requirements**: array of strings - Tools, libraries, or setup needed
- **lessonId**: string - Reference to the associated lesson

### NavigationItem
- **type**: enum ('chapter', 'lesson', 'external') - The type of navigation item
- **title**: string - The display name in navigation
- **path**: string - The URL path for the item
- **parentId**: string (optional) - Reference to parent item for nested navigation
- **order**: integer - The position in navigation sequence