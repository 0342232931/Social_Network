package vn.ths.SocialNetwork.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    public boolean existsByUsername(String username);
    public boolean existsByEmail(String email);
    public Optional<User> findByUsername(String username);

    @Query("SELECT DISTINCT m.receiver FROM Message m WHERE m.sender.id = :senderId")
    public List<User> getReceiverHaveMessageWithSenderId(@Param("senderId") String senderId);

    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.receiver.id = :receiverId")
    public List<User> getSenderHaveMessageWithReceiverId(@Param("receiverId") String receiverId);
}
