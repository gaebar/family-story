from app import app, db
from models.story import Story
from models.user import UserSchema


user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    gae, errors = user_schema.load({
        'username': 'Gae',
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

    jack, errors = user_schema.load({
        'username': 'jack',
        'email': 'jack@email.com',
        'password': 'pass',
        'password_confirmation': 'pass',
        'image_url': 'https://www.shareicon.net/data/128x128/2016/08/18/810198_user_512x512.png',
        'bio': 'Cheese lover!'
    })

    if errors:
        raise Exception(errors)

    first_story = 'Germany has a process of naturalisation specifically ' + \
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
        creator=gae
    )

    db.session.add(gae)
    db.session.add(jack)
    db.session.add(mapping_my_way)
    db.session.add(origins)

    db.session.commit()
