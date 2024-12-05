package vn.ths.SocialNetwork.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.ths.SocialNetwork.entity.user.Relation;
import vn.ths.SocialNetwork.entity.user.User;

import java.util.Optional;

@Repository
public interface RelationRepository extends JpaRepository<Relation, String> {
    public Optional<Relation> getByUser(User user);
    public Relation getRelationByUserId(String userId);
}
