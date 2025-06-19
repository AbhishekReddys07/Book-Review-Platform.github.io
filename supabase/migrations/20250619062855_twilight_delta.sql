/*
  # Seed Sample Data for Book Review Platform

  1. Sample Books
    - Add diverse collection of books across different genres
    - Include popular titles with realistic data
    - Use Pexels images for book covers

  2. Sample Admin User
    - Create admin user for testing
    - Password: admin123 (hashed)

  3. Sample Reviews
    - Add realistic reviews for books
    - Vary ratings and comments
*/

-- Insert sample admin user (password: admin123)
INSERT INTO users (id, name, email, password, role) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Admin User', 'admin@bookreview.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample books
INSERT INTO books (id, title, author, description, genre, isbn, publishedDate, coverImage, pages, publisher) VALUES 
(
  '123e4567-e89b-12d3-a456-426614174000',
  'The Midnight Library',
  'Matt Haig',
  'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
  'Fiction',
  '9781786892737',
  '2020-08-13',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  288,
  'Canongate Books'
),
(
  '123e4567-e89b-12d3-a456-426614174001',
  'Educated',
  'Tara Westover',
  'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom.',
  'Biography',
  '9780399590504',
  '2018-02-20',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  334,
  'Random House'
),
(
  '123e4567-e89b-12d3-a456-426614174002',
  'The Seven Husbands of Evelyn Hugo',
  'Taylor Jenkins Reid',
  'Reclusive Hollywood icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.',
  'Romance',
  '9781501161933',
  '2017-06-13',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  400,
  'Atria Books'
),
(
  '123e4567-e89b-12d3-a456-426614174003',
  'Dune',
  'Frank Herbert',
  'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
  'Science Fiction',
  '9780441172719',
  '1965-08-01',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  688,
  'Chilton Books'
),
(
  '123e4567-e89b-12d3-a456-426614174004',
  'The Silent Patient',
  'Alex Michaelides',
  'Alicia Berenson''s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house overlooking a park in one of London''s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.',
  'Mystery',
  '9781250301697',
  '2019-02-05',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  336,
  'Celadon Books'
),
(
  '123e4567-e89b-12d3-a456-426614174005',
  'Where the Crawdads Sing',
  'Delia Owens',
  'For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.',
  'Fiction',
  '9780735219090',
  '2018-08-14',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  384,
  'G.P. Putnam''s Sons'
),
(
  '123e4567-e89b-12d3-a456-426614174006',
  'The Hobbit',
  'J.R.R. Tolkien',
  'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
  'Fantasy',
  '9780547928227',
  '1937-09-21',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  310,
  'George Allen & Unwin'
),
(
  '123e4567-e89b-12d3-a456-426614174007',
  'Atomic Habits',
  'James Clear',
  'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world''s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
  'Self-Help',
  '9780735211292',
  '2018-10-16',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  320,
  'Avery'
),
(
  '123e4567-e89b-12d3-a456-426614174008',
  'The Thursday Murder Club',
  'Richard Osman',
  'In a peaceful retirement village, four unlikely friends meet weekly in the Jigsaw Room to discuss unsolved crimes; together they call themselves the Thursday Murder Club. When a local developer is found dead with a mysterious photograph left next to the body, the Thursday Murder Club suddenly find themselves in the middle of their first live case.',
  'Mystery',
  '9781984880987',
  '2020-09-03',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  368,
  'Pamela Dorman Books'
),
(
  '123e4567-e89b-12d3-a456-426614174009',
  'Sapiens: A Brief History of Humankind',
  'Yuval Noah Harari',
  'From a renowned historian comes a groundbreaking narrative of humanity''s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be "human."',
  'History',
  '9780062316097',
  '2014-09-04',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  464,
  'Harper'
),
(
  '123e4567-e89b-12d3-a456-426614174010',
  'The Invisible Life of Addie LaRue',
  'V.E. Schwab',
  'France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever—and is cursed to be forgotten by everyone she meets. Thus begins the extraordinary life of Addie LaRue, and a story that spans centuries: a life lived on the margins, from the forests of France to the theaters of London to the cafes of New York.',
  'Fantasy',
  '9780765387561',
  '2020-10-06',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  448,
  'Tor Books'
),
(
  '123e4567-e89b-12d3-a456-426614174011',
  'Project Hail Mary',
  'Andy Weir',
  'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn''t know that. He can''t even remember his own name, let alone the nature of his assignment or how to complete it.',
  'Science Fiction',
  '9780593135204',
  '2021-05-04',
  'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
  496,
  'Ballantine Books'
)
ON CONFLICT (id) DO NOTHING;

-- Insert sample regular users
INSERT INTO users (id, name, email, password, role) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Sarah Johnson', 'sarah@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'user'),
('550e8400-e29b-41d4-a716-446655440002', 'Michael Chen', 'michael@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'user'),
('550e8400-e29b-41d4-a716-446655440003', 'Emma Davis', 'emma@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'user'),
('550e8400-e29b-41d4-a716-446655440004', 'David Wilson', 'david@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (bookId, userId, rating, comment) VALUES 
(
  '123e4567-e89b-12d3-a456-426614174000',
  '550e8400-e29b-41d4-a716-446655440001',
  5,
  'Absolutely beautiful and thought-provoking. Matt Haig has created something truly special with The Midnight Library. The concept is fascinating and the execution is flawless. This book made me think about all the different paths my life could have taken.'
),
(
  '123e4567-e89b-12d3-a456-426614174000',
  '550e8400-e29b-41d4-a716-446655440002',
  4,
  'A really interesting premise that explores regret and the paths not taken. While some parts felt a bit repetitive, the overall message is powerful and the writing is engaging. Definitely worth reading.'
),
(
  '123e4567-e89b-12d3-a456-426614174001',
  '550e8400-e29b-41d4-a716-446655440003',
  5,
  'Tara Westover''s memoir is absolutely incredible. Her journey from a survivalist family to Cambridge is both heartbreaking and inspiring. The writing is beautiful and her story is unforgettable.'
),
(
  '123e4567-e89b-12d3-a456-426614174002',
  '550e8400-e29b-41d4-a716-446655440004',
  5,
  'I couldn''t put this book down! Taylor Jenkins Reid has crafted such a compelling story with Evelyn Hugo. The characters are complex and the plot twists kept me guessing until the very end.'
),
(
  '123e4567-e89b-12d3-a456-426614174003',
  '550e8400-e29b-41d4-a716-446655440001',
  4,
  'A classic for a reason. Frank Herbert created an incredibly detailed and immersive world. While it can be dense at times, the payoff is worth it. Essential reading for any sci-fi fan.'
),
(
  '123e4567-e89b-12d3-a456-426614174004',
  '550e8400-e29b-41d4-a716-446655440002',
  4,
  'A gripping psychological thriller that kept me on the edge of my seat. The twist was unexpected and well-executed. Alex Michaelides knows how to craft a compelling mystery.'
),
(
  '123e4567-e89b-12d3-a456-426614174005',
  '550e8400-e29b-41d4-a716-446655440003',
  5,
  'Beautiful, haunting, and unforgettable. Delia Owens has created a masterpiece that combines mystery with stunning nature writing. Kya is a character that will stay with me forever.'
),
(
  '123e4567-e89b-12d3-a456-426614174007',
  '550e8400-e29b-41d4-a716-446655440004',
  5,
  'This book changed my life! James Clear provides practical, actionable advice for building good habits and breaking bad ones. The 1% better concept is simple but powerful.'
)
ON CONFLICT (bookId, userId) DO NOTHING;