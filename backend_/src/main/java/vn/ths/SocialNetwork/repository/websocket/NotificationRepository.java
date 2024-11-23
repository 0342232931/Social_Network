package vn.ths.SocialNetwork.repository.websocket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.websocket.Notification;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    @Query("SELECT n FROM Notification n WHERE n.receiver.id = :receiverId")
    public List<Notification> getNotificationsByReceiverId(@Param("receiverId") String receiverId);
}
