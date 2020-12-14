import { useRouter } from "next/router"
import Root from "../../components/root/root"
import query from "../../js/query"

const User = (props) => {
    const router = useRouter()
    return (
        <Root title="Profile">
            { JSON.stringify(props) }
        </Root>
    )
}
/*
	<div id="root-profile">
		<header class="flex justify-between align-center">
			<a href="/h"><img id="logo" src="/icons/apple-icon.png" alt="Convex Logo"/></a>
		</header>
		<main id="page">
			<h1 class="title">User Profile</h1>
			<!-- <% if(display.displayName == self.displayName) { %> <a class="text" href="/h/settings">Edit</a> <% } %> -->
			<div class="display-info clearfix max-width">
				<img src="<%= display.photoURL ? photoURL : '/images/default.png' %>" />
				<% let badges = (display.badges || []).map(v => `<span class="badge ${v.toLowerCase().replace(/ /gi, '-')}">[${v}]</span>`) %>
				<h2 class="title"><%= display.displayName %> <%- badges.join(' ') %></h2>
				<p class="text"><%= display.bio%></p>
				<% if(display.displayName !== self.displayName) {
					let type = 'primary'
					if(display.friends.includes(self.uid)) {
						type = 'accent'
					} %>
					<button id="friend" class="float-right button-<%= type%>"><%= type == 'accent' ? 'Unfriend': 'Friend' %></button>
				<% } %>
			</div>
			<div class="flex justify-around display-stats max-width align-stretch">
				<div class="display-card flex-third">
					<% let friendCount = display.friends.length  %>
					<h2 class="title"><%= friendCount %></h2>
					<p class="text">Friend<%= friendCount == 1 ? '' : 's' %></p>
				</div>
				<div class="display-card flex-third">
					<% let posts = 0
					let claps = 0
					for(const [key, value] of Object.entries(display.releases)) {
						posts += value.length
					} %>
					<h2 class="title"><%= posts %></h2>
					<p class="text">Posts</p>
				</div>
				<div class="display-card flex-third">
					<h2 class="title"><%= claps %></h2>
					<p class="text">Claps</p>
				</div>
			</div>
		</main>
	</div>
*/

export async function getServerSideProps({ params }) {
    const { username } = params

    const details = await query(null, {
        username
    }, "http://localhost:3000/api/u/search")
    console.log(details)
    
    if(details.hasOwnProperty("error")) {
        return (
            {
                props: {
                    publicInfo: {

                    }
                }
            }
        )
    }

    return (
        {
            props: {
                publicInfo: details.success
            }
        }
    )
}

export default User