import { useParams } from 'react-router-dom';

export default function About() {
  const { name } = useParams();
  return (
    <>
      <h1>Welcome {name}</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus,
        blanditiis! Quo, maxime. Sunt numquam quod, voluptatum voluptates
        adipisci iste. Saepe temporibus voluptatibus porro aliquam veniam
        praesentium quam dicta est consectetur magni, neque, minus blanditiis
        quisquam quos a aperiam placeat exercitationem quod reiciendis
        cupiditate commodi facere autem obcaecati! Est error accusantium
        voluptate veritatis? Provident nesciunt magnam ipsum corrupti ipsam
        necessitatibus officia, consectetur labore sint, nulla ullam fuga,
        libero quia vitae maxime magni alias soluta commodi fugit culpa
        dignissimos voluptatibus! Accusantium et quasi error ipsa, iure
        inventore. A esse, natus nam facilis deleniti vero neque quibusdam.
        Alias nulla voluptatum explicabo totam non.
      </p>
    </>
  );
}
