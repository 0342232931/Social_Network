package vn.ths.SocialNetwork.repository.websocket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.websocket.Notification;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    @Query("SELECT n FROM Notification n WHERE n.receiver.id = :receiverId ORDER BY n.createAt ASC")
    public List<Notification> getNotificationsByReceiverId(@Param("receiverId") String receiverId);

    @Query("SELECT n FROM Notification n WHERE n.type = :type AND n.receiver.id = :receiverId ORDER BY n.createAt ASC")
    public List<Notification> getByTypeAndReceiverId(@Param("type") String type, @Param("receiverId") String receiverId);
}
