module ApplicationHelper
def gravatar_for(user, size="80x80")
    if user.avatar_url.present?
      gravatar_url = user.avatar_url
    else
      gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
      gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}"
    end
    image_tag(gravatar_url, :size => size, alt: user.email, class: "gravatar")
  end
end
