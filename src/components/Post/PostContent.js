import styles from "./PostContent.module.css";
import post from "../../assets/post.jpg";

export default function PostContent() {
  return (
    <>
      <div className={styles["content"]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        pellentesque nisl vel tincidunt viverra. Nulla congue sem ut leo
        elementum convallis. Nam rhoncus congue augue, vitae consectetur augue
        pretium in. Sed eu malesuada diam. Duis ac neque venenatis, blandit arcu
        in, malesuada lacus. Mauris non tellus eu nisl iaculis elementum.
        Suspendisse justo augue, lacinia ac euismod a, interdum in nunc. Donec
        sit amet libero bibendum, ornare lectus sit amet, vehicula leo. Morbi
        pellentesque mi ac diam sollicitudin, commodo interdum ipsum lobortis.
        Vestibulum quis accumsan ante.
      </div>
      <img src={post} alt="post" />
    </>
  );
}
