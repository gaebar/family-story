from app import app, db
from models.story import Story
from models.user import UserSchema


user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    gaetano, errors = user_schema.load({
        'username': 'Gaetano',
        'email': 'gae@email.com',
        'password': 'pass',
        'password_confirmation': 'pass',
        'image_url': 'https://images-na.ssl-images-amazon.com/images/I/71gvLgqIOdL._UX250_.jpg',
        'bio': 'Writing historical novels, several of them have been published. Research and blogging about old Italian Traditions, Shadow Yoga, reading books, travel to historical places.'
    })

    if errors:
        raise Exception(errors)

    mapping_my_way, errors = user_schema.load({
        'username': 'mapping_my_way',
        'email': 'wes@email.com',
        'password': 'pass',
        'password_confirmation': 'pass',
        'image_url': 'https://www.shareicon.net/data/128x128/2016/08/18/810211_user_512x512.png',
        'bio': 'I love cake'
    })

    if errors:
        raise Exception(errors)

    albert, errors = user_schema.load({
        'username': 'albert',
        'email': 'albert@email.com',
        'password': 'pass',
        'password_confirmation': 'pass',
        'image_url': 'https://goodmenproject.com/wp-content/uploads/2019/04/shutterstock_524940991.jpg',
        'bio': 'Writing this website opened a doorway for me into my family’s past, to a room full of anecdotes and stories that I’d never heard before. I thought I knew my history; we’re a family of talkers after all. But there was so much more I discovered through my research, it’s been an absolute joy of a process.'
    })

    if errors:
        raise Exception(errors)

    first_story = 'Germany has a process of naturalization specifically ' + \
        'for people deprived of their German citizenship on political, racial or ' + \
        'religious grounds during 1933-1945. It’s called Article 116 and seeks to ' + \
        'restore citizenship to these people and their descendants. My mum’s father,' + \
        ' my grandpa, Joachim, was born in 1912 in modern day Poland and his father ' + \
        '(originally a Polish Jew) applied for German citizenship for himself, his wife ' + \
        'and his five children as they were all living in Germany. Joachim, Juliette, Ali ' + \
        '(Alfred), Fredy (Friedrich) and Hans all became German. In the early 1930s, 20 something ' + \
        'Joachim (born in 1912) fled Germany for the U.K. He convinced most of his siblings to come ' + \
        'too, but Juliette stayed behind with her husband and young son. She escaped Germany but was caught ' + \
        'in Vichy France and she was killed by the Nazis. Her son and husband survived. Her grave is in Albi and was visited by ' + \
        'her brother Joachim and his wife(my grandparents) for the first time on their honeymoon in the 1950s. My grandpa Joe met  ' + \
        'my grandmother Pam in Nigeria after he was sent to Egypt with the Royal West African Frontier Force, British Army. There he ' + \
        'met a Nigerian businessman who invited him to come to Nigeria and try and start a business. They had 5 children, including my ' + \
        'mum Penny. Just in case you’re interested 🙂🇪🇺'

    origins = Story(
        title='A story about my Jewish origins',
        description='Collecting our German naturalisation certificates this morning!',
        content=first_story,
        image_url='https://jewishculture.illinois.edu/sites/default/files/inline-images/IMG_0056.JPG',
        creator=gaetano
    )

    if errors:
        raise Exception(errors)

    second_story = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' + \
        'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' + \
        'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum' + \
        'dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia' + \
        'deserunt mollit anim id est laborum.'

    lorem = Story(
        title='The standard Lorem Ipsum passage, used since the 1500s',
        description='Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC',
        content=second_story,
        image_url='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/800f4758483335.59fe0a6b9b40f.jpg',
        creator=albert
    )

    if errors:
        raise Exception(errors)

    third_story = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' + \
        'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' + \
        'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum' + \
        'dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia' + \
        'deserunt mollit anim id est laborum.'

    lorem_three = Story(
        title='Lorem Ipsum',
        description='Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC',
        content=third_story,
        image_url='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4fa55c56757449.59bad0296cc5b.jpg',
        creator=gaetano

    db.session.add(gaetano)
    db.session.add(albert)
    db.session.add(mapping_my_way)
    db.session.add(origins)
    db.session.add(lorem)
    db.session.add(lorem_three)

    db.session.commit()
