package vn.ths.SocialNetwork.repository.websocket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.websocket.Message;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    @Query("SELECT m FROM Message m WHERE (m.sender.id = :senderId OR m.sender.id = :receiverId) " +
            "AND (m.receiver.id = :receiverId OR m.receiver.id = :senderId) ORDER BY m.createAt ASC")
    List<Message> getBySenderAndReceiver(@Param("senderId") String senderId, @Param("receiverId") String receiverId);

    @Query("SELECT DISTINCT m.receiver FROM Message m WHERE m.sender.id = :senderId")
    public List<User> getReceiverHaveMessageWithSenderId(@Param("senderId") String senderId);

    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.receiver.id = :receiverId")
    public List<User> getSenderHaveMessageWithReceiverId(@Param("receiverId") String receiverId);
}
