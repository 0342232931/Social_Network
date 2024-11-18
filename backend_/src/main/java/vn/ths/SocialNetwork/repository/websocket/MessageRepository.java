package vn.ths.SocialNetwork.repository.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.chat.Message;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    List<Message> getBySenderAndReceiver(User sender, User receiver);
}
